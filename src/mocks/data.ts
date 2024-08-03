import { Chat, ChatUser } from '../models/types';

export const users: ChatUser[] = [
  {
    id: '1',
    name: 'Adam Dunn',
    handle: 'programmerDuDe',
    initials: 'AD',
  },
  {
    id: '2',
    name: 'Tim Robinson',
    handle: 'Detroiter',
    initials: 'AD',
  },
  {
    id: '3',
    name: 'Weird Al',
    handle: 'WhiteAndNerdy',
    initials: 'AD',
  },
  {
    id: '4',
    name: 'Eric Wareheim',
    handle: 'JetSkiBoy',
    initials: 'AD',
  },
  {
    id: '5',
    name: 'Tim Heidecker',
    handle: 'Decker',
    initials: 'AD',
  },
];

export const chats: Chat[] = [
  {
    id: '1',
    userUd: '4',
    timeStamp: new Date('2024-06-11T13:15:00Z'),
    htmlText: 'Hey folks! We just got here with our jet skis!',
  },
  {
    id: '2',
    userUd: '5',
    timeStamp: new Date('2024-06-11T13:20:00Z'),
    htmlText: "Yeah, how's it going?",
  },
  {
    id: '3',
    userUd: '1',
    timeStamp: new Date('2024-06-11T13:22:00Z'),
    htmlText: 'Gee am I lucky to be in this group!?',
  },
  {
    id: '4',
    userUd: '3',
    timeStamp: new Date('2024-06-11T13:25:00Z'),
    htmlText:
      'OH BOY ME TOO <span>@programmerDuDe</span>! Let me break out my accordian!',
  },
  {
    id: '4',
    userUd: '2',
    timeStamp: new Date('2024-06-11T13:27:00Z'),
    htmlText:
      "Are you sure 'bout that!?",
  },
];
