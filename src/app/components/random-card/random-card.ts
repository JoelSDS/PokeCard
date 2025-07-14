import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokemonApi } from '../../models/pokemonApi';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-random-card',
  imports: [JsonPipe],
  templateUrl: './random-card.html',
  styleUrl: './random-card.scss',
})
export class RandomCard {
  private http = inject(HttpClient);
  public randomId = signal(this.generateRandomId());
  public pokemon = signal<Pokemon | null>(null);

  constructor() {
    this.getPokemon();
    effect(() => {
      this.getPokemon();
    });
  }

  getPokemon() {
    this.http
      .get<PokemonApi>(`https://pokeapi.co/api/v2/pokemon/${this.randomId()}`)
      .subscribe((data) => {
        const poke: Pokemon = {
          id: data.id,
          name: data.forms[0].name,
          image: data.sprites.front_default,
          type: data.types[0].type.name,
        };
        this.pokemon.set(poke);
      });
  }
  generateRandomId() {
    return Math.floor(Math.random() * (1 + 151 + 1)) + 1;
  }
  generateRandomCard() {
    this.randomId.set(this.generateRandomId());
  }
}
