import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../service/cart.service';
import { Product } from '../../model/products.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product',
  imports: [AsyncPipe, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  readonly productsService = inject(ProductsService);
  readonly cartService = inject(CartService);
  readonly route = inject(ActivatedRoute);

  readonly product$ = this.route.params.pipe(
    map((params) => params['id']),
    switchMap((id) => this.productsService.getOneProduct(id)),
  );

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
