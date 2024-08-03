import { http, HttpResponse } from 'msw';
import { chats, handles } from './data';
import { Chat, Handle } from '../models/types';


export const handlers = [
    http.get('/api/chats', () => {
      return HttpResponse.json<Chat[]>(chats);
    }),

    http.get('/api/handles', () => {
        return HttpResponse.json<Handle[]>(handles);
      }),

    http.post('/api/chats', async ({request}) => {
      const chat = await request.json() as Chat;
      if(!chat)
      {
          return HttpResponse.json({ success: false });
      }
  
      chats.push(chat);
  
      return HttpResponse.json({ success: true });
    })
  ];