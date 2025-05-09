import { createSelector } from '@ngrx/store';
import { cartFeature } from '../../state/reducers/cart.reducer';

export const cartSelectors = createSelector(
  cartFeature.selectCartItems,
  (cartItems) => ({
    cartItems,
  }),
);
