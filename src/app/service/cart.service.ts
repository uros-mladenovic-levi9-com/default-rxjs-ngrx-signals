import { Injectable } from '@angular/core';
import { Product } from '../model/products.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly cartItems$: Observable<Product[]>;

  private storageKey = 'cart';
  private cartSubject: BehaviorSubject<Product[]>;

  constructor() {
    const stored = localStorage.getItem(this.storageKey);
    const initialCart = stored ? JSON.parse(stored) : [];
    this.cartSubject = new BehaviorSubject<Product[]>(initialCart);
    this.cartItems$ = this.cartSubject.asObservable();
  }

  addToCart(product: Product): void {
    const currentCart = this.cartSubject.value;
    if (!currentCart.some((item) => item.id === product.id)) {
      const updatedCart = [...currentCart, product];
      this.updateCart(updatedCart);
    }
  }

  removeFromCart(productId: number): void {
    const updatedCart = this.cartSubject.value.filter(
      (item) => item.id !== productId,
    );
    this.updateCart(updatedCart);
  }

  clearCart(): void {
    this.cartSubject.next([]);
    localStorage.removeItem(this.storageKey);
  }

  private updateCart(cart: Product[]): void {
    this.cartSubject.next(cart);
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }
}
