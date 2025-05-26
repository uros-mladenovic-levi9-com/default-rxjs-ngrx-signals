import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsComponentStore } from './products.component.store';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  imports: [RouterModule, ProductCardComponent],
  providers: [ProductsComponentStore],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  readonly productsComponentStore = inject(ProductsComponentStore);
}
