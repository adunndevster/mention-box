import { Component, signal, effect } from '@angular/core';
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
export class ChatEntryComponent {
  chatValue = signal('hi <span>good</span>');
  showMentionBox = false;

  constructor() {}

  onInput($event: Event) {
    const value = ($event.target as HTMLDivElement).innerText;
    if (value) this.chatValue.set(value);
    this.showMentionBox = false;
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === '@') {
      this.showMentionBox = true;
    }
  }

}
