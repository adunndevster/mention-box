import { Chat } from '../models/types';

export const chats: Chat[] = [
  {
    id: '1',
    user: {
      id: '4',
      name: 'Eric Wareheim',
      handle: 'JetSkiBoy',
      initials: 'EW',
    },
    timeStamp: new Date('2024-06-11T13:15:00Z'),
    htmlText: 'Hey folks! We just got here with our jet skis!',
  },
  {
    id: '2',
    user: {
      id: '5',
      name: 'Tim Heidecker',
      handle: 'Decker',
      initials: 'TH',
    },
    timeStamp: new Date('2024-06-11T13:20:00Z'),
    htmlText: "Yeah, how's it going?",
  },
  {
    id: '3',
    user: {
      id: '1',
      name: 'Adam Dunn',
      handle: 'programmerDuDe',
      initials: 'AD',
    },
    timeStamp: new Date('2024-06-11T13:22:00Z'),
    htmlText: 'Gee, <span>@Decker</span> am I lucky to be in this group!?',
  },
  {
    id: '4',
    user: {
      id: '3',
      name: 'Weird Al',
      handle: 'WhiteAndNerdy',
      initials: 'WA',
    },
    timeStamp: new Date('2024-06-11T13:25:00Z'),
    htmlText:
      'OH BOY ME TOO <span>@programmerDuDe</span>! Let me break out my accordian!',
  },
  {
    id: '4',
    user: {
      id: '2',
      name: 'Tim Robinson',
      handle: 'Detroiter',
      initials: 'TR',
    },
    timeStamp: new Date('2024-06-11T13:27:00Z'),
    htmlText: "Are you sure 'bout that!?",
  },
];
