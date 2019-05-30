import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective {
  @Input() element_name;
  constructor() { }

  scrollTo () {
    window.scrollTo(this.element_name);
  }
}
