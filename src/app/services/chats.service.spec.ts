import { TestBed } from '@angular/core/testing';

import { ChatsService } from './chats.service';

describe('CommentsService', () => {
  let service: ChatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
