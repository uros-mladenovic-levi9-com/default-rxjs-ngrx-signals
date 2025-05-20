import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { Product } from '../model/products.model';
import { computed, inject } from '@angular/core';
import { CartService } from '../service/cart.service';

type CartState = {
  cartItems: Product[];
};

const initialState: CartState = {
  cartItems: [],
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    cartService: inject(CartService),
  })),
  withComputed((store) => {
    const numberOfItems = computed(() => store.cartItems().length);

    return { numberOfItems };
  }),
  withMethods((store) => {
    const getCartItems = () => {
      const cartItems = store.cartService.getCart();

      patchState(store, {
        cartItems,
      });
    };

    const addToCart = (product: Product) => {
      const cartItems = store.cartItems().some((item) => item.id === product.id)
        ? store.cartItems()
        : [...store.cartItems(), product];

      store.cartService.setCart(cartItems);

      patchState(store, {
        cartItems,
      });
    };

    const removeFromCart = (productId: number) => {
      const cartItems = store
        .cartItems()
        .filter((item) => item.id !== productId);

      store.cartService.setCart(cartItems);

      patchState(store, {
        cartItems,
      });
    };

    return { getCartItems, addToCart, removeFromCart };
  }),
  withHooks({
    onInit: (store) => {
      store.getCartItems();
    },
  }),
);
