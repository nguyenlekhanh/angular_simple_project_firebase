import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSetBackground]',
  standalone: true
})
export class SetBackgroundDirective {
  //private element: ElementRef
  
  constructor(private element: ElementRef, private renderer: Renderer2) { 
    //this.element = el;
  }

  ngOnInit() {
    //access directly DOM
    //this.element.nativeElement.style.backgroundColor = '#36454F';
    //this.element.nativeElement.style.color = 'white';

    //not directly access the DOM
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', '#36454F');
    this.renderer.setStyle(this.element.nativeElement, 'color', 'white');
    // this.renderer.setAttribute(this.element.nativeElement, 'title', 'This is example title');
  }

}