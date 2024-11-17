import React, { memo } from "react";

import {
  PokemonsList,
  PokemonsListPagination,
  PokemonsSearchBar,
} from "features/pokemons/components";

import styles from "features/pokemons/styles/PokemonsListScreen.module.scss";
import { strings } from "core/constants";

const PokemonsListScreen: React.FC = memo(() => {
  const { pokemonsListScreenStrings } = strings.pokemonsStrings;
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.headerContainer}>
        <h1 className={styles.mainTitle}>
          {pokemonsListScreenStrings.mainTitle}
        </h1>
        <PokemonsSearchBar />
      </div>
      <PokemonsList />
      <PokemonsListPagination />
    </div>
  );
});

export default PokemonsListScreen;
