import { Component, inject } from '@angular/core';
import { ChatsService } from '../services/chats.service';
import { Observable } from 'rxjs';
import { Chat } from '../../models/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.sass'
})
export class CommentsComponent {

  #chatsService = inject(ChatsService);
  chats$: Observable<Chat[]> | undefined;

  constructor()
  {
    this.chats$ = this.#chatsService.getChats();
  }

}
