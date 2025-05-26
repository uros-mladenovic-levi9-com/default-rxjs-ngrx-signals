import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { AsyncPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, RouterModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  readonly productsService = inject(ProductsService);
  readonly router = inject(Router);
  readonly products$ = this.productsService.getAllProducts();

  navigateToProductDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}
