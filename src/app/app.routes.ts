import { Routes } from '@angular/router';

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
  },
  {
    path: '**',
    redirectTo: 'pokecard',
  },
];
