import { Pokemon } from "core/constants";

export interface PokemonState {
  isLoading: boolean;
  pokemons: Pokemon[];
  currentPokemonProfile: Pokemon;
  pokemonsCount: number;
  searchTerm: string;
  refetchAfterSearch: boolean;
  lastViewedPage: number;
  error: string | null;
}

export const defaultPokemon: Pokemon = {
  id: 0,
  name: '',
  base_experience: 0,
  height: 0,
  is_default: false,
  order: 0,
  weight: 0,
  abilities: [],
  forms: [],
  game_indices: [],
  held_items: [],
  location_area_encounters: '',
  moves: [],
  past_types: [],
  sprites: {
    back_default: undefined,
    back_female: undefined,
    back_shiny: undefined,
    back_shiny_female: undefined,
    front_default: undefined,
    front_female: undefined,
    front_shiny: undefined,
    front_shiny_female: undefined,
    other: {
      dream_world: {
        front_default: undefined,
        front_female: undefined,
      },
      home: {
        front_default: undefined,
        front_female: undefined,
        front_shiny: undefined,
        front_shiny_female: undefined,
      },
      "official-artwork": {
        front_default: undefined,
        front_shiny: undefined,
      },
      showdown: {
        back_default: undefined,
        back_female: undefined,
        back_shiny: undefined,
        back_shiny_female: undefined,
        front_default: undefined,
        front_female: undefined,
        front_shiny: undefined,
        front_shiny_female: undefined,
      },
    },
    versions: {},
  },
  cries: {
    latest: '',
    legacy: '',
  },
  species: {
    name: '',
    url: '',
  },
  stats: [],
  types: [],
};
