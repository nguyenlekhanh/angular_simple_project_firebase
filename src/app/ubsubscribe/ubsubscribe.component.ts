import { Component } from '@angular/core';
import { interval } from 'rxjs';

import { CommonModule } from '@angular/common'; //ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-ubsubscribe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './ubsubscribe.component.html',
  styleUrl: './ubsubscribe.component.css'
})
export class UbsubscribeComponent {
  counter = interval(1000);
  data: number[] = [];
  subscriber1;

  OnSubscribe() {
    this.subscriber1 = this.counter.subscribe((val) => {
      this.data.push(val);
    });
  }

  OnUnSubscribe() {
    this.subscriber1.unsubscribe();
  }
}
