import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  readonly productsService = inject(ProductsService);
  readonly products$ = this.productsService.getAllProducts();
}
