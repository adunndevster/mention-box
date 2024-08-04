import {
  Component,
  signal,
  effect,
  ViewChild,
  ElementRef,
  AfterViewInit,
  inject,
} from '@angular/core';
import { MentionBoxComponent } from '../mention-box/mention-box.component';
import { CommonModule } from '@angular/common';
import { ChatsService } from '../services/chats.service';
import { Chat } from '../../models/types';
import { localUser } from '../../mocks/data';
import { generateGUID } from '../utils/misc';

@Component({
  selector: 'app-chat-entry',
  standalone: true,
  imports: [MentionBoxComponent, CommonModule],
  templateUrl: './chat-entry.component.html',
  styleUrl: './chat-entry.component.sass',
})
export class ChatEntryComponent implements AfterViewInit {
  @ViewChild('entryField') entryField!: ElementRef;

  #chatService = inject(ChatsService);
  chatValue = '';
  currentCursorPos = 1;
  private savedRange: Range | null = null;
  showMentionBox = false;

  constructor() {}

  ngAfterViewInit() {
    this.entryField.nativeElement.innerHTML = this.chatValue;
  }

  onInput($event: Event) {
    this.chatValue = ($event.target as HTMLDivElement).innerHTML;
    this.showMentionBox = false;
    this.updateCursorPosition();
  }

  onKeyPress = async (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      await this.saveChat();
    }
  };

  private async saveChat() {
    const chat: Chat = {
      id: generateGUID(),
      user: localUser,
      htmlText: this.entryField.nativeElement.innerHTML,
      timeStamp: new Date(),
    };
    this.entryField.nativeElement.innerHTML = '';
    try {
      await this.#chatService.createChat(chat);
      await this.#chatService.refreshChats();
    } catch (error) {
      console.error(error);
    }
  }

  onKeyUp(event: KeyboardEvent) {
    console.log(event.key);
    
    const isCharacterKey = event.key.match(/(\w|\s)/g) &&
      !event.key.includes("Arrow");

    if (event.key === '@') {
      this.showMentionBox = true;
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        this.savedRange = selection.getRangeAt(0).cloneRange();
      }
    } else if (
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      isCharacterKey
    ) {
      this.handleSpanDeletion(event);
    }
    this.updateCursorPosition();
  }

  updateCursorPosition() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      this.currentCursorPos = range.startOffset;
    }
  }

  private handleSpanDeletion(event: KeyboardEvent) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const startContainer = range.startContainer;
    const startOffset = range.startOffset;

    let spanElement: HTMLSpanElement | null = null;

    // Check if we're at the right edge of a span
    if (
      startContainer.nodeType === Node.TEXT_NODE &&
      startContainer.parentElement?.tagName === 'SPAN'
    ) {
      spanElement = startContainer.parentElement;
      if (
        startOffset === (startContainer as Text).length &&
        event.key === 'Delete'
      ) {
        this.unwrapSpan(spanElement);
        event.preventDefault();
        return;
      }
    }

    // Check if we're inside or at the left edge of a span
    if (
      startContainer.nodeType === Node.ELEMENT_NODE &&
      (startContainer as HTMLElement).tagName === 'SPAN'
    ) {
      spanElement = startContainer as HTMLSpanElement;
      if (startOffset === 0 && event.key === 'Backspace') {
        this.unwrapSpan(spanElement);
        // event.preventDefault();
        return;
      }
    }

    // If we're inside a span, unwrap it
    if (spanElement) {
      this.unwrapSpan(spanElement);
      event.preventDefault();
    }
  }

  private unwrapSpan(span: HTMLSpanElement) {
    const parent = span.parentNode;
    if (!parent) return;

    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span);
    }
    parent.removeChild(span);
  }

  onEntryClick = async () => {
    this.showMentionBox = false;
    await this.saveChat();
  };

  onSelectHandle(value: string) {
    this.entryField.nativeElement.focus();

    if (this.savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(this.savedRange);

      const range = this.savedRange;

      // Create a span element to wrap the @handle
      const spanElement = document.createElement('span');
      spanElement.textContent = `@${value}`;

      const nullNode = document.createTextNode(`${String.fromCharCode(0)}`);

      // Delete the existing '@' symbol
      range.setStart(range.startContainer, range.startOffset - 1);
      range.setEnd(range.endContainer, range.endOffset);
      range.deleteContents();

      // Insert the new nodes
      range.insertNode(nullNode);
      range.insertNode(spanElement);

      // Move the cursor to the end of the inserted text
      range.setStartAfter(nullNode);
      range.setEndAfter(nullNode);
      selection?.removeAllRanges();
      selection?.addRange(range);

      // Update the chatValue
      this.chatValue = this.entryField.nativeElement.innerHTML;

      // Clear the saved range
      this.savedRange = null;
    }

    this.showMentionBox = false;
  }

  onMentionsClose() {
    this.showMentionBox = false;
  }
}
