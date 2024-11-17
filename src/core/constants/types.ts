export interface APIResource {
  url: string;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface Description {
  description: string;
  language: NamedAPIResource;
}

export interface Effect {
  effect: string;
  language: NamedAPIResource; 
}

export interface VerboseEffect extends Effect {
  short_effect: string;
}

export interface FlavorText {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource; 
}

export interface GenerationGameIndex {
  game_index: number;
  generation: NamedAPIResource;
}


export interface PokemonLinks {
  name: string;
  url: string;
}


export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[]; 
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  past_types: PokemonTypePast[];
  sprites: PokemonSprites;
  cries: PokemonCries;
  species: NamedAPIResource; 
  stats: PokemonStat[];
  types: PokemonType[];
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource; 
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource; 
}

export interface PokemonTypePast {
  generation: NamedAPIResource; 
  types: PokemonType[];
}

export interface PokemonHeldItem {
  item: NamedAPIResource; 
  version_details: PokemonHeldItemVersion[];
}

export interface PokemonHeldItemVersion {
  version: NamedAPIResource; 
  rarity: number;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

export interface PokemonMoveVersion {
  move_learn_method: NamedAPIResource; 
  version_group: NamedAPIResource; 
  level_learned_at: number;
}

export interface PokemonStat {
  stat: NamedAPIResource; 
  effort: number;
  base_stat: number;
}

export interface PokemonSprites {
  back_default: string | undefined;
  back_female: string | undefined;
  back_shiny: string | undefined;
  back_shiny_female: string | undefined;
  front_default: string | undefined;
  front_female: string | undefined;
  front_shiny: string | undefined;
  front_shiny_female: string | undefined;
  other: {
    dream_world: {
      front_default: string | undefined;
      front_female: string | undefined;
    };
    home: {
      front_default: string | undefined;
      front_female: string | undefined;
      front_shiny: string | undefined;
      front_shiny_female: string | undefined;
    };
    "official-artwork": {
      front_default: string | undefined;
      front_shiny: string | undefined;
    };
    showdown: {
      back_default: string | undefined;
      back_female: string | undefined;
      back_shiny: string | undefined;
      back_shiny_female: string | undefined;
      front_default: string | undefined;
      front_female: string | undefined;
      front_shiny: string | undefined;
      front_shiny_female: string | undefined;
    };
  };
  versions: {
    [generation: string]: {
      [game: string]: {
        [sprite: string]: string | undefined;
      };
    };
  };
}

export interface PokemonCries {
  latest: string;
  legacy: string;
}

export interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource; 
}

export interface VersionEncounterDetail {
  version: NamedAPIResource; 
  max_chance: number;
  encounter_details: Encounter[];
}

export interface Encounter {
  min_level: number;
  max_level: number;
  condition_values: NamedAPIResource[]; 
  chance: number;
  method: NamedAPIResource; 
}

// Additional Types
export interface MachineVersionDetail {
  machine: APIResource;
  version_group: NamedAPIResource; 
}

export interface VersionGroupFlavorText {
  text: string;
  language: NamedAPIResource; 
  version_group: NamedAPIResource; 
}
