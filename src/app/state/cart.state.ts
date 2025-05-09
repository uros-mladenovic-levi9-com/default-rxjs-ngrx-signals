import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Product } from '../model/products.model';

type CartState = {
  cartItems: Product[];
};

const initialState: CartState = {
  cartItems: [],
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const addToCart = (product: Product) => {
      patchState(store, {
        cartItems: store.cartItems().some((item) => item.id === product.id)
          ? store.cartItems()
          : [...store.cartItems(), product],
      });
    };

    const removeFromCart = (productId: number) => {
      patchState(store, {
        cartItems: store.cartItems().filter((item) => item.id !== productId),
      });
    };

    return { addToCart, removeFromCart };
  }),
);
