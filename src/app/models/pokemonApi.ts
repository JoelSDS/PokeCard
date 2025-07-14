export interface PokemonApi {
  id: number;
  forms: { name: string }[];
  sprites: { front_default: string };
  types: { type: { name: string } }[];
}
