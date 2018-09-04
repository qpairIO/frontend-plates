
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[jmxExpandable]'
})
export class HighlightDirective {
    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
     }
}