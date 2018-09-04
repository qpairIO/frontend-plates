import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[var]',
  exportAs: 'var'
})
class VarDirective {
  @Input() var:any;
}