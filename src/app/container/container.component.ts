import { Component, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common'; //ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { SearchComponent } from './search/search.component';

import { ProductListComponent } from './product-list/product-list.component';

import { ProductDetailComponent } from './product-detail/product-detail.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductListComponent,
    ProductDetailComponent,
    SearchComponent
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {

  @ViewChild(ProductListComponent) productListComponent: ProductListComponent
}
