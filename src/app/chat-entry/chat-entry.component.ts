import {
  Component,
  signal,
  effect,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { MentionBoxComponent } from '../mention-box/mention-box.component';
import { CommonModule } from '@angular/common';
import { SetPositionDirective } from '../directives/set-position.directive';

@Component({
  selector: 'app-chat-entry',
  standalone: true,
  imports: [MentionBoxComponent, CommonModule],
  templateUrl: './chat-entry.component.html',
  styleUrl: './chat-entry.component.sass',
})
export class ChatEntryComponent implements AfterViewInit{
  @ViewChild('entryField') entryField!: ElementRef;
  chatValue = '';
  currentCursorPos = 1;
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

  onKeyUp(event: KeyboardEvent) {
    if (event.key === '@') {
      this.showMentionBox = true;
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

  onSelectHandle(value: string) {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const atSymbolNode = document.createTextNode('@');
      const handleNode = document.createTextNode(value);
      const spaceNode = document.createTextNode(' ');

      // Delete the existing '@' symbol
      range.setStart(range.startContainer, this.currentCursorPos - 1);
      range.setEnd(range.startContainer, this.currentCursorPos);
      range.deleteContents();

      // Insert the new nodes
      range.insertNode(spaceNode);
      range.insertNode(handleNode);
      range.insertNode(atSymbolNode);

      // Move the cursor to the end of the inserted text
      range.setStartAfter(spaceNode);
      range.setEndAfter(spaceNode);
      selection.removeAllRanges();
      selection.addRange(range);

      // Update the chatValue
      this.chatValue = this.entryField.nativeElement.innerHTML;
    }

    this.showMentionBox = false;
  }

  onMentionsClose() {
    this.showMentionBox = false;
  }
}
