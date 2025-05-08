import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  readonly cartService = inject(CartService);

  readonly cartItems$ = this.cartService.cartItems$;

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }
}
