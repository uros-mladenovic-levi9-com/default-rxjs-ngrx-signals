import { Product } from '../../model/products.model';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { ProductsService } from '../../service/products.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

type ProductsState = {
  products: Product[];
};

const initialState: ProductsState = {
  products: [],
};

export const ProductsComponentStore = signalStore(
  withState(initialState),
  withProps(() => ({
    productsService: inject(ProductsService),
  })),
  withMethods((store) => {
    const getAllProducts = rxMethod<void>(
      pipe(() =>
        store.productsService.getAllProducts().pipe(
          tapResponse({
            next: (products) => {
              patchState(store, {
                products,
              });
            },
            error: (error) => {
              console.error('Error fetching products:', error);
            },
          }),
        ),
      ),
    );

    return {
      getAllProducts,
    };
  }),
  withHooks({
    onInit: (store) => {
      store.getAllProducts();
    },
  }),
);

export type ProductsComponentStore = InstanceType<
  typeof ProductsComponentStore
>;
