import { Component, inject } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Product } from '../../model/products.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  imports: [MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  standalone: true,
})
export class CartComponent {
  readonly cartService = inject(CartService);

  get cartItems(): Product[] {
    return this.cartService.getCartItems();
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }
}
