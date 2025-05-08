import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { Product } from '../model/products.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly httpClient = inject(HttpClient);

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('assets/data/products.json');
  }

  getOneProduct(id: string): Observable<Product | undefined> {
    return this.httpClient
      .get<Product[]>('assets/data/products.json')
      .pipe(map((products) => products.find((p) => p.id === +id)));
  }
}
