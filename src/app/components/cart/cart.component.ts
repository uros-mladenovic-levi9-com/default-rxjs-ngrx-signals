import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CartStore } from '../../state/cart.state';

@Component({
  selector: 'app-cart',
  imports: [MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  readonly cartStore = inject(CartStore);
}
