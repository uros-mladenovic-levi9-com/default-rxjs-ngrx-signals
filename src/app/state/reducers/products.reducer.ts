import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../../model/products.model';
import { productsActions } from '../actions/products.actions';

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
}

export const initialState: ProductState = {
  products: [],
  selectedProduct: null,
};

export const productsReducer = createReducer(
  initialState,
  on(productsActions.getProductsOnSuccess, (state, { products }) => ({
    ...state,
    products,
  })),
  on(productsActions.getProductsOnFailure, (state) => ({
    ...state,
    products: [],
  })),
  on(productsActions.getProductByIdOnSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product,
  })),
  on(productsActions.getProductByIdOnFailure, (state) => ({
    ...state,
    selectedProduct: null,
  })),
  on(productsActions.clearSelectedProduct, (state) => ({
    ...state,
    selectedProduct: null,
  })),
);

export const productsFeature = createFeature({
  name: 'products',
  reducer: productsReducer,
});
