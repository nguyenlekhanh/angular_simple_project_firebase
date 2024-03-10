import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSetBackground]',
  standalone: true
})
export class SetBackgroundDirective {

  constructor(private el: ElementRef) { 
    this.el.nativeElement.style.backgroundColor = '#36454F';
    this.el.nativeElement.style.color = 'white';
  }

}