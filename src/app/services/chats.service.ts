import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Chat, ChatUser } from '../../models/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  #http = inject(HttpClient);
  

  constructor() { }

  getChats(): Observable<Chat[]>
  {
    return this.#http.get<Chat[]>("/api/chats");
  }

  addChat()
  {
    throw Error();
  }
}
