import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
  RootState,
} from "store";
import {
  fetchPokemonsCount,
  fetchPokemonProfile,
  fetchPokemonsLinks,
} from "utils/api/pokemonService";

import { defaultPokemon, PokemonState } from "./types.ts";

const initialState: PokemonState = {
  isLoading: false,
  pokemons: [],
  pokemonsCount: 0,
  lastViewedPage: 0,
  refetchAfterSearch: false,
  searchTerm: "",
  currentPokemonProfile: defaultPokemon,
  error: null,
};

const calculateLimitAndOffset = (
  offset: number,
  searchTerm: string,
  pokemonsCount: number
) => {
  const limit = searchTerm ? pokemonsCount : 20;
  const calculatedOffset = offset * 20;
  return { limit, calculatedOffset };
};

export const getCurrentPokemonProfile = createAsyncThunk(
  "pokemon/getCurrentPokemonProfile",
  async ({ pokemonName }: { pokemonName: string }) => {
    try {
      const pokemonProfile = await fetchPokemonProfile(pokemonName);
      return pokemonProfile;
    } catch (error) {
      throw error;
    }
  }
);

export const getPokemonsPage = createAsyncThunk(
  "pokemon/getPokemonsPage",
  async ({ offset, searchTerm }: { offset: number; searchTerm: string }) => {
    try {
      const pokemonsCount = await fetchPokemonsCount();
      const { limit, calculatedOffset } = calculateLimitAndOffset(
        offset,
        searchTerm,
        pokemonsCount
      );
      const data = await fetchPokemonsLinks(limit, calculatedOffset);

      let pokemonsList = await Promise.all(
        data.results.map(async (result) => {
          const pokemon = await fetch(result.url);
          return await pokemon.json();
        })
      );

      if (searchTerm) {
        pokemonsList = pokemonsList.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return {
        pokemonsList,
        pokemonsCount,
        lastViewedPage: offset + 1,
        searchTerm,
        refetch: !!searchTerm,
      };
    } catch (error) {
      throw error;
    }
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemonsPage.fulfilled, (state, action) => {
        const {
          pokemonsList,
          pokemonsCount,
          lastViewedPage,
          searchTerm,
          refetch,
        } = action.payload;

        state.pokemons = pokemonsList;
        state.pokemonsCount = pokemonsCount;
        state.searchTerm = searchTerm;
        state.refetchAfterSearch = refetch;
        if (!searchTerm) state.lastViewedPage = lastViewedPage;
      })
      .addCase(getCurrentPokemonProfile.fulfilled, (state, action) => {
        state.currentPokemonProfile = action.payload;
      })
      .addMatcher(isFulfilledAction, (state) => {
        if (state.pokemons.length === 0) {
          state.error =
            "Your search returned no results. Please try a different search term.";
        } else {
          state.error = null;
        }
        state.isLoading = false;
      })
      .addMatcher(isPendingAction, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clear } = pokemonSlice.actions;

export const selectPokemons = (state: RootState) => state.pokemons;

export default pokemonSlice.reducer;
