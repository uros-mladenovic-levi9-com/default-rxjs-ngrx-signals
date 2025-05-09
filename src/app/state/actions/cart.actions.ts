import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../model/products.model';

export const cartActions = createActionGroup({
  source: 'Cart',
  events: {
    getCartItems: emptyProps(),
    getCartItemsOnSuccess: props<{ cartItems: Product[] }>(),
    getCartItemsOnFailure: props<{ error: string }>(),
    addToCart: props<{ product: Product }>(),
    addToCartOnSuccess: emptyProps(),
    addToCartOnFailure: props<{ error: string }>(),
    removeFromCart: props<{ productId: number }>(),
    removeFromCartOnSuccess: emptyProps(),
    removeFromCartOnFailure: props<{ error: string }>(),
  },
});
