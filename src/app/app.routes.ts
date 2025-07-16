import { Routes } from '@angular/router';
import { rangeIdGuard } from './guards/range-id-guard';

export const routes: Routes = [
  {
    path: 'pokecard',
    loadComponent: () =>
      import('./components/random-card/random-card').then((m) => m.RandomCard),
  },
  {
    path: 'pokecard/:id',
    loadComponent: () =>
      import('./components/poke-card/poke-card').then((m) => m.PokeCard),
    canActivate: [rangeIdGuard],
  },
  {
    path: 'notFound',
    loadComponent: () =>
      import('./components/not-found/not-found').then((m) => m.NotFound),
  },
  {
    path: '**',
    redirectTo: 'pokecard',
  },
];
