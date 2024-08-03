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

    // http.post('/api/suggestions', async ({request}) => {
    //   const data = await request.json() as Suggestion;
    //   if(!data)
    //   {
    //       return HttpResponse.json({ success: false });
    //   }
  
    //   appData.suggestions.push(data);
    //   conversations[data.conversationId] = [];
  
    //   return HttpResponse.json({ success: true });
    // })
  ];