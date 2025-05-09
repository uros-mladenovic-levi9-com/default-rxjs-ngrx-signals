import { createSelector } from '@ngrx/store';
import { productsFeature } from '../../state/reducers/products.reducer';

export const productsSelectors = createSelector(
  productsFeature.selectProducts,
  (products) => ({
    products,
  }),
);
