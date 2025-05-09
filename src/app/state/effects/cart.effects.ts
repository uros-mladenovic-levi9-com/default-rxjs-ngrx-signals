import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { CartService } from '../../service/cart.service';
import { cartActions } from '../actions/cart.actions';

export const getCartItemsEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.getCartItems),
      switchMap(() => {
        return of(cartService.getCartItems()).pipe(
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
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.addToCart),
      switchMap((action) => {
        return of(cartService.addToCart(action.product)).pipe(
          map(() => cartActions.addToCartOnSuccess()),
          catchError((error) => of(cartActions.addToCartOnFailure({ error }))),
        );
      }),
    );
  },
  { functional: true },
);

export const removeFromCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.removeFromCart),
      exhaustMap((action) => {
        return of(cartService.removeFromCart(action.productId)).pipe(
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
