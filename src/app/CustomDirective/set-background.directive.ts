import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSetBackground]',
  standalone: true
})
export class SetBackgroundDirective {
  //private element: ElementRef
  
  constructor(private element: ElementRef) { 
    //this.element = el;
  }

  ngOnInit() {
    this.element.nativeElement.style.backgroundColor = '#36454F';
    this.element.nativeElement.style.color = 'white';
  }
}