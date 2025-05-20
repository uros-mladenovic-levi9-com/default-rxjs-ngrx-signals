import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { cartSelectors } from './cart.selectors';
import { AsyncPipe } from '@angular/common';
import { cartActions } from '../../state/actions/cart.actions';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  readonly store = inject(Store);

  readonly vm$ = this.store.select(cartSelectors);

  ngOnInit(): void {
    this.store.dispatch(cartActions.getCartItems());
  }

  removeFromCart(id: number): void {
    this.store.dispatch(cartActions.removeFromCart({ productId: id }));
  }
}
