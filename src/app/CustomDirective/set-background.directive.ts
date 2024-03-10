import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSetBackground]',
  standalone: true
})
export class SetBackgroundDirective {
  //private element: ElementRef
  
  constructor(private element: ElementRef, private renderer: Renderer2) { 
    //this.element = el;
  }

  @Input() textColor: string = '#36454F';
  @Input() backgroundColor: string = 'white';

  // @Input('appSetBackground') changeTextAndBackColor: {backColor: string, textColor: string};

  ngOnInit() {
    //access directly DOM
    //this.element.nativeElement.style.backgroundColor = '#36454F';
    //this.element.nativeElement.style.color = 'white';

    //not directly access the DOM
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', this.backgroundColor);
    this.renderer.setStyle(this.element.nativeElement, 'color', this.textColor);
    // this.renderer.setAttribute(this.element.nativeElement, 'title', 'This is example title');
  }

}