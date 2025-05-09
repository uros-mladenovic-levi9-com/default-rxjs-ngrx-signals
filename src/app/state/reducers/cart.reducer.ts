import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../../model/products.model';
import { cartActions } from '../actions/cart.actions';

export interface CartState {
  cartItems: Product[];
}

export const initialState: CartState = {
  cartItems: [],
};

export const cartReducer = createReducer(
  initialState,
  on(cartActions.getCartItemsOnSuccess, (state, { cartItems }) => ({
    ...state,
    cartItems,
  })),
  on(cartActions.getCartItemsOnFailure, (state) => ({
    ...state,
    cartItems: [],
  })),
  on(cartActions.addToCart, (state, { product }) => ({
    ...state,
    cartItems: state.cartItems.some((item) => item.id === product.id)
      ? state.cartItems
      : [...state.cartItems, product],
  })),
  on(cartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    cartItems: state.cartItems.filter((item) => item.id !== +productId),
  })),
);

export const cartFeature = createFeature({
  name: 'cart',
  reducer: cartReducer,
});
