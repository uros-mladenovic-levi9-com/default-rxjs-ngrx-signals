import { createSelector } from '@ngrx/store';
import { productsFeature } from '../../state/reducers/products.reducer';

export const productSelectors = createSelector(
  productsFeature.selectSelectedProduct,
  (selectedProduct) => ({
    selectedProduct,
  }),
);
