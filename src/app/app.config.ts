import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { productsFeature } from './state/reducers/products.reducer';
import { cartFeature } from './state/reducers/cart.reducer';
import * as productsEffects from './state/effects/products.effects';
import * as cartEffects from './state/effects/cart.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState(productsFeature),
    provideState(cartFeature),
    provideEffects(cartEffects),
    provideEffects(productsEffects),
  ],
};
