import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common'; //ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { Product } from '../../../Models/Product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input()
  product: Product;
}