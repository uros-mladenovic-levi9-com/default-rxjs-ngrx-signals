import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { productsSelectors } from './products.selectors';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { productsActions } from '../../state/actions/products.actions';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, RouterModule, MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  readonly store = inject(Store);

  readonly vm$ = this.store.select(productsSelectors);

  ngOnInit() {
    this.store.dispatch(productsActions.getProducts());
  }
}
