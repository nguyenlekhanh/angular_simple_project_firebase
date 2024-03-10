import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSetBackground]',
  standalone: true
})
export class SetBackgroundDirective {
  private element: ElementRef
  
  constructor(private el: ElementRef) { 
    this.element = el;
  }

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = '#36454F';
    this.el.nativeElement.style.color = 'white';
  }
}