import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Output, signal, ViewChild } from '@angular/core';
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
export class MentionBoxComponent implements AfterViewInit {
  @Output() onClose = new EventEmitter();
  @Output() selectHandle = new EventEmitter();
  @ViewChild("searchBox") searchBox!: ElementRef;
  searchValue = '';

  #handlesService = inject(HandlesService);
  handles$: Observable<Handle[]> | undefined;

  constructor()
  {
    this.handles$ = this.#handlesService.getHandles();
  }

  ngAfterViewInit(): void {
    if(this.searchBox?.nativeElement)
    {
      console.log(this.searchBox?.nativeElement)
      this.searchBox?.nativeElement.focus();
    }
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
