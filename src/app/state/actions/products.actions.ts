import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../model/products.model';

export const productsActions = createActionGroup({
  source: 'Products',
  events: {
    getProducts: emptyProps(),
    getProductsOnSuccess: props<{ products: Product[] }>(),
    getProductsOnFailure: props<{ error: string }>(),
    getProductById: props<{ productId: number }>(),
    getProductByIdOnSuccess: props<{ product: Product }>(),
    getProductByIdOnFailure: props<{ error: string }>(),
  },
});
