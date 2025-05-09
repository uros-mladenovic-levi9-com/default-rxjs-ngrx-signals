import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ProductComponentStore } from './product.component.store';
import { Product } from '../../model/products.model';
import { CartStore } from '../../state/cart.state';

@Component({
  selector: 'app-product',
  imports: [MatButtonModule],
  providers: [ProductComponentStore],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  readonly productComponentStore = inject(ProductComponentStore);
  readonly cartStore = inject(CartStore);

  addToCart(product: Product) {
    this.cartStore.addToCart(product);
  }
}
