import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appClass]',
  standalone: true
})
export class AppClassDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  @Input() set display(value: Object) {
    let entries = Object.entries(value);

    for(let item of entries) {
      //console.log(item[0], item[1]);
      if(item[1]) {
        this.renderer.addClass(this.element.nativeElement, item[0]);
      }
    }
  }

}
