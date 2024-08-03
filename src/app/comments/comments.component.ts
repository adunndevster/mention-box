import { Component, computed, inject, Signal } from '@angular/core';
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
  chats: Signal<Chat[]> = computed(() => this.#chatsService.conversation());

  constructor()
  {
    this.#chatsService.refreshChats();
  }

}
