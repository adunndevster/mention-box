import { Component, inject } from '@angular/core';
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
  #handlesService = inject(HandlesService);
  handles$: Observable<Handle[]> | undefined;

  constructor()
  {
    this.handles$ = this.#handlesService.getHandles();
  }
}
