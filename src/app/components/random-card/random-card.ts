import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokemonApi } from '../../models/pokemonApi';
import { TYPE_COLORS } from '../../utils/type-color';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { PokemonServices } from '../../services/pokemon-services';
@Component({
  selector: 'app-random-card',
  imports: [MatIcon, MatFabButton],
  templateUrl: './random-card.html',
  styleUrl: './random-card.scss',
})
export class RandomCard {
  private pokeService = inject(PokemonServices);
  public randomId = signal(this.generateRandomId());
  public pokemon = signal<Pokemon | null>(null);
  public colorList = [];
  public loading = signal(false);

  constructor() {
    effect(() => {
      this.getPokemon();
    });
  }

  ngOnInit() {
    this.generateRandomCard();
  }

  getPokemon() {
    this.pokeService.getPokemonById(this.randomId()).then((data) => {
      const poke: Pokemon = {
        id: data.id,
        name: data.forms[0].name,
        image: data.sprites.front_default,
        type: data.types[0].type.name,
        colorType: TYPE_COLORS[data.types[0].type.name],
      };
      this.pokemon.set(poke);
    });
  }
  generateRandomId() {
    return (Math.floor(Math.random() * (1 + 151 + 1)) + 1).toString();
  }
  generateRandomCard() {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
    }, 1200);
    this.randomId.set(this.generateRandomId());
  }
}
