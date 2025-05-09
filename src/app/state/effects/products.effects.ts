import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../../service/products.service';
import { productsActions } from '../actions/products.actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const getAllProductsEffect = createEffect(
  (actions$ = inject(Actions), productsService = inject(ProductsService)) => {
    return actions$.pipe(
      ofType(productsActions.getProducts),
      switchMap(() => {
        return productsService.getAllProducts().pipe(
          map((products) => productsActions.getProductsOnSuccess({ products })),
          catchError((error) =>
            of(productsActions.getProductsOnFailure({ error })),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const getProductByIdEffect = createEffect(
  (actions$ = inject(Actions), productsService = inject(ProductsService)) => {
    return actions$.pipe(
      ofType(productsActions.getProductById),
      switchMap((action) => {
        console.log(action);
        return productsService.getOneProduct(action.productId.toString()).pipe(
          map((product) =>
            productsActions.getProductByIdOnSuccess({ product: product! }),
          ),
          catchError((error) =>
            of(productsActions.getProductByIdOnFailure({ error })),
          ),
        );
      }),
    );
  },
  { functional: true },
);
