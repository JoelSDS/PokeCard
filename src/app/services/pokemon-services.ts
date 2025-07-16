import { inject, Injectable } from '@angular/core';
import { PokemonApi } from '../models/pokemonApi';
import { TYPE_COLORS } from '../utils/type-color';
import { Pokemon } from '../models/pokemon';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonServices {
  private http = inject(HttpClient);

  async getPokemonById(id: string): Promise<PokemonApi> {
    return await firstValueFrom(
      this.http.get<PokemonApi>(`https://pokeapi.co/api/v2/pokemon/${id}`)
    );
  }
}
