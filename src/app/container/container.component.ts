import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { CommonModule } from '@angular/common'; //ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { SearchComponent } from './search/search.component';

import { ProductListComponent } from './product-list/product-list.component';

import { ProductDetailComponent } from './product-detail/product-detail.component';

import { FeaturedBrandsComponent } from './featured-brands/featured-brands.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductListComponent,
    ProductDetailComponent,
    SearchComponent,
    FeaturedBrandsComponent
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
  // encapsulation: ViewEncapsulation.None - not encapsulate //default is Encapsulation //ViewEncapsulation.ShadowDom - seperate with main DOM
})
export class ContainerComponent {

  @ViewChild(ProductListComponent) productListComponent: ProductListComponent
  featureDisplay: boolean = false;
}
