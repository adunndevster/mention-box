import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HandlesService } from '../services/handles.service';
import { Observable } from 'rxjs';
import { Handle } from '../../models/types';
import { CommonModule } from '@angular/common';
import { SetPositionDirective } from '../directives/set-position.directive';

@Component({
  selector: 'app-mention-box',
  standalone: true,
  imports: [CommonModule, FormsModule, SetPositionDirective],
  templateUrl: './mention-box.component.html',
  styleUrl: './mention-box.component.sass',
})
export class MentionBoxComponent implements AfterViewInit {
  @Output() onClose = new EventEmitter();
  @Output() selectHandle = new EventEmitter();
  @ViewChild('searchBox') searchBox!: ElementRef;
  searchValue = signal('');

  #handlesService = inject(HandlesService);

  filteredHandles = computed(() => {
    const lowerSearchValue = this.searchValue().toLocaleLowerCase();
    return this.#handlesService
      .handles()
      .filter((item) =>
        item.handle.toLocaleLowerCase().includes(lowerSearchValue)
      );
  });

  constructor() {
    this.#handlesService.refreshHandles();
  }

  ngAfterViewInit(): void {
    if (this.searchBox?.nativeElement) {
      this.searchBox?.nativeElement.focus();
    }
  }

  onKeyDown($event: KeyboardEvent) {
    if ($event.key === 'Escape') {
      this.onClose.emit();
    }
  }

  onSelect($event: MouseEvent) {
    const value = ($event.target as HTMLButtonElement).value;
    this.selectHandle.emit(value);
  }
}
