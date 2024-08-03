import { Component } from '@angular/core';
import { CommentsComponent } from "../comments/comments.component";
import { ChatEntryComponent } from "../chat-entry/chat-entry.component";

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommentsComponent, ChatEntryComponent],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.sass'
})
export class ChatBoxComponent {
}
