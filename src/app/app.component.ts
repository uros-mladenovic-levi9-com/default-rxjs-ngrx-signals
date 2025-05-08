import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CartComponent } from './components/cart/cart.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    CartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
