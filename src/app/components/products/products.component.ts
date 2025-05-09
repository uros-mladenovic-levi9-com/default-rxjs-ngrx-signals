import { Component, inject } from '@angular/core';
import { ProductsComponentStore } from './products.component.store';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [RouterModule],
  providers: [ProductsComponentStore],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  readonly productsComponentStore = inject(ProductsComponentStore);
}
