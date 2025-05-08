import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../model/products.model';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../service/cart.service';
@Component({
  selector: 'app-product',
  imports: [MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProductComponent implements OnInit {
  product?: Product;

  readonly productsService = inject(ProductsService);
  readonly cartService = inject(CartService);
  readonly route = inject(ActivatedRoute);
  readonly destroyRef = inject(DestroyRef);
  readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.productsService
      .getOneProduct(this.route.snapshot.params['id'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((product) => {
        this.product = product;
        this.cdr.detectChanges();
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
