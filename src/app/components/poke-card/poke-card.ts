import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, Input, input, signal } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokemonApi } from '../../models/pokemonApi';
import { TYPE_COLORS } from '../../utils/type-color';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { PokemonServices } from '../../services/pokemon-services';

@Component({
  selector: 'app-poke-card',
  imports: [MatIcon, MatFabButton],
  templateUrl: './poke-card.html',
  styleUrl: './poke-card.scss',
})
export class PokeCard {
  private http = inject(HttpClient);
  private pokeService = inject(PokemonServices);
  @Input() id!: string;
  public pokemon = signal<Pokemon | null>(null);
  public router = inject(Router);
  localId = signal(this.id);
  public previousDisabled = false;
  public nextDisabled = false;

  constructor() {
    effect(() => {
      this.getPokemon();
      this.testBtn();
    });
  }

  ngOnInit() {
    this.localId.set(this.id);
  }

  getPokemon() {
    this.pokeService.getPokemonById(this.localId()).then((data) => {
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

  navPokemon(target: string) {
    let newId = parseInt(this.localId()) - 1;
    if (target === 'next') {
      newId = parseInt(this.localId()) + 1;
    }

    this.localId.set(newId.toString());
    this.router.navigate(['/pokecard', newId]);
  }
  testBtn() {
    this.previousDisabled = false;
    this.nextDisabled = false;
    const newId = parseInt(this.localId());
    if (newId <= 1) {
      this.previousDisabled = true;
    }
    if (newId >= 151) {
      this.nextDisabled = true;
    }
  }
}
