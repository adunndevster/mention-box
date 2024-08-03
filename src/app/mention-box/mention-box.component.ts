import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { HandlesService } from '../services/handles.service';
import { Observable } from 'rxjs';
import { Handle } from '../../models/types';
import { CommonModule } from '@angular/common';
import { SetPositionDirective } from '../directives/set-position.directive';

@Component({
  selector: 'app-mention-box',
  standalone: true,
  imports: [CommonModule, SetPositionDirective],
  templateUrl: './mention-box.component.html',
  styleUrl: './mention-box.component.sass'
})
export class MentionBoxComponent {
  @Output() onClose = new EventEmitter();
  @Output() selectHandle = new EventEmitter();

  #handlesService = inject(HandlesService);
  handles$: Observable<Handle[]> | undefined;

  constructor()
  {
    this.handles$ = this.#handlesService.getHandles();
  }

  onKeyDown($event:KeyboardEvent)
  {
    if($event.key === 'Escape')
    {
      this.onClose.emit();
    }
  }

  onSelect($event:MouseEvent)
  {
    const value = ($event.target as HTMLButtonElement).value;
    this.selectHandle.emit(value);
  }
}
