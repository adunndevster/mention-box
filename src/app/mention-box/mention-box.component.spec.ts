import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionBoxComponent } from './mention-box.component';

describe('MentionBoxComponent', () => {
  let component: MentionBoxComponent;
  let fixture: ComponentFixture<MentionBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentionBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
