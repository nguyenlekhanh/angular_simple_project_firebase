import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common'; //ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { Product } from '../../Models/Product';
import { ProductListComponent } from '../product-list/product-list.component';


@Component({
  selector: 'product-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product: Product;

  @Input() productListComp: ProductListComponent = undefined;

  ngOnInit() {
    this.product = this.productListComp.selectedProduct;
  }
}
