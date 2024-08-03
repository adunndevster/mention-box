import { Injectable, signal, WritableSignal } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Chat } from '../../models/types';
import { axiosInstance } from './api';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  conversation:WritableSignal<Chat[]> = signal([]);

  async refreshChats() {
    try {
      const response = await axiosInstance.get<Chat[]>('/chats');
      this.conversation.set(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
      throw error;
    }
  }

  async createChat(chat: Chat): Promise<Chat> {
    try {
      const response = await axiosInstance.post<Chat>('/chats', chat);
      return response.data;
    } catch (error) {
      console.error('Error creating chat:', error);
      throw error;
    }
  }
}
