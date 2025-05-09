import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { productSelectors } from './product.selectors';
import { productsActions } from '../../state/actions/products.actions';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { Product } from '../../model/products.model';
import { cartActions } from '../../state/actions/cart.actions';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product',
  imports: [AsyncPipe, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  readonly store = inject(Store);
  readonly route = inject(ActivatedRoute);
  readonly destroyRef = inject(DestroyRef);
  readonly vm$ = this.store.select(productSelectors);

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((params) => params['id']),
      )
      .subscribe((id) => {
        this.store.dispatch(productsActions.getProductById({ productId: id }));
      });
  }

  addToCart(product: Product | null): void {
    if (!product) return;

    this.store.dispatch(cartActions.addToCart({ product }));
  }
}
