import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { Product } from '../../model/products.model';
import { ProductsService } from '../../service/products.service';
import { Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  imports: [RouterModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  readonly productsService = inject(ProductsService);
  readonly cdr = inject(ChangeDetectorRef);
  readonly destroyRef = inject(DestroyRef);
  readonly router = inject(Router);

  ngOnInit(): void {
    this.productsService
      .getAllProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products) => {
        this.products = products;
        this.cdr.detectChanges();
      });
  }

  navigateToProductDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}
