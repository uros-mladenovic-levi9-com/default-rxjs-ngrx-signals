import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../model/products.model';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product?: Product;
  @Output() productCardClicked = new EventEmitter<number>();
}
