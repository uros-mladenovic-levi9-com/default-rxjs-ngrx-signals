import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/products/products.component').then(
        (m) => m.ProductsComponent,
      ),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./components/product/product.component').then(
        (m) => m.ProductComponent,
      ),
  },
];
