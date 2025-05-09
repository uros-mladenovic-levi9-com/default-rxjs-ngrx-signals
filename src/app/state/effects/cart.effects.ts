import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CartService } from '../../service/cart.service';
import { cartActions } from '../actions/cart.actions';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';
import { cartSelectors } from '../../components/cart/cart.selectors';

export const getCartItemsEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.getCartItems),
      switchMap(() => {
        return of(cartService.getCart()).pipe(
          map((cartItems) => cartActions.getCartItemsOnSuccess({ cartItems })),
          catchError((error) =>
            of(cartActions.getCartItemsOnFailure({ error })),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const addToCartEffect = createEffect(
  (
    actions$ = inject(Actions),
    cartService = inject(CartService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(cartActions.addToCart),
      concatLatestFrom(() => store.select(cartSelectors)),
      switchMap(([_, { cartItems }]) => {
        return of(cartService.setCart(cartItems)).pipe(
          map(() => cartActions.addToCartOnSuccess()),
          catchError((error) => of(cartActions.addToCartOnFailure({ error }))),
        );
      }),
    );
  },
  { functional: true },
);

export const removeFromCartEffect = createEffect(
  (
    actions$ = inject(Actions),
    cartService = inject(CartService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(cartActions.removeFromCart),
      concatLatestFrom(() => store.select(cartSelectors)),
      switchMap(([_, { cartItems }]) => {
        return of(cartService.setCart(cartItems)).pipe(
          map(() => cartActions.removeFromCartOnSuccess()),
          catchError((error) =>
            of(cartActions.removeFromCartOnFailure({ error })),
          ),
        );
      }),
    );
  },
  { functional: true },
);
