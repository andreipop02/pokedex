import { Pokemon, PokemonLinks } from "core/constants/types.ts";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchAllPokemonLinks = async (): Promise<PokemonLinks[]> => {
  try {
    const response = await fetch(`${BASE_URL}?limit=100000`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error(
      `There was a problem with your request. Please check your internet connection or try again later!`
    );
  }
};

export const fetchPokemonsCount = async (): Promise<number> => {
  try {
    const response = await fetch(`${BASE_URL}?limit=0`);
    const data = await response.json();
    return data.count;
  } catch (error) {
    throw new Error(
      `There was a problem with your request. Please check your internet connection or try again later!`
    );
  }
};

export const fetchPokemonProfile = async (
  pokemonName: string
): Promise<Pokemon> => {
  try {
    const response = await fetch(`${BASE_URL}/${pokemonName}`);
    return await response.json();
  } catch (error) {
    throw new Error(`There is no pokemon on this page!`);
  }
};

export const fetchPokemonsLinks = async (
  limit: number,
  offset: number
): Promise<{ results: PokemonLinks[] }> => {
  try {
    const response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
    return await response.json();
  } catch {
    throw new Error(
      `There was a problem with your request. Please check your internet connection or try again later!`
    );
  }
};
