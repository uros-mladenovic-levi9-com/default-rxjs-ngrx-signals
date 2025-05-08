import { Injectable } from '@angular/core';
import { Product } from '../model/products.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageKey = 'cart';

  private getCart(): Product[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private setCart(cart: Product[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  addToCart(product: Product): void {
    const cart = this.getCart();
    if (!cart.some((item) => item.id === product.id)) {
      cart.push(product);
      this.setCart(cart);
    }
  }

  removeFromCart(productId: number): void {
    const cart = this.getCart().filter((item) => item.id !== productId);
    this.setCart(cart);
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }

  getCartItems(): Product[] {
    return this.getCart();
  }
}
