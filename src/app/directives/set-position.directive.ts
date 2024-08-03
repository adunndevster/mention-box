import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSetPosition]',
  standalone: true
})
export class SetPositionDirective implements AfterViewInit {

  constructor(private el: ElementRef) { 
  }

  ngAfterViewInit(): void {
    const cursorPosition = this.getCursorPosition();
    if (cursorPosition) {
      this.el.nativeElement.style.top = cursorPosition.top + 'px';
      this.el.nativeElement.style.left = cursorPosition.left + 'px';
    }
  }
  
  getCursorPosition() {
    // FULL DISCLOSURE - AI
    const selection = window.getSelection();
    if(!selection) return null;
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0).cloneRange();
      if (range.getClientRects().length > 0) {
        const rect = range.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left
        };
      }
    }
    return null;
  }
}
