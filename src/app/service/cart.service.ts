import { Injectable } from '@angular/core';
import { Product } from '../model/products.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageKey = 'cart';

  getCart(): Product[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  setCart(cart: Product[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }
}
