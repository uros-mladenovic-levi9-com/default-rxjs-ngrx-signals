import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { Product } from '../../model/products.model';
import { inject } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { ActivatedRoute } from '@angular/router';

type ProductState = {
  product: Product | null;
};

const initialState: ProductState = {
  product: null,
};

export const ProductComponentStore = signalStore(
  withState(initialState),
  withProps(() => ({
    productsService: inject(ProductsService),
    route: inject(ActivatedRoute),
  })),
  withMethods((store) => {
    const loadProductById = rxMethod<number>(
      pipe(
        switchMap((id) =>
          store.productsService.getOneProduct(id.toString()).pipe(
            tapResponse({
              next: (product) => {
                patchState(store, {
                  product,
                });
              },
              error: (error) => {
                console.error('Error fetching product:', error);
              },
            }),
          ),
        ),
      ),
    );
    return { loadProductById };
  }),
  withHooks({
    onInit: (store) => {
      const productId = store.route.params.pipe(map((p) => p['id']));
      store.loadProductById(productId);
    },
  }),
);

export type ProductComponentStore = InstanceType<typeof ProductComponentStore>;
