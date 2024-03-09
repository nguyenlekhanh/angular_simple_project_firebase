import { Component, Input } from '@angular/core';

import { Product } from '../../Models/Product';
@Component({
  selector: 'product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  @Input()
  product: Product;
}
