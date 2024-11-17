import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchCircleSharp } from "react-icons/io5";

import { useAppSelector } from "store";
import { selectPokemons } from "features/pokemons/redux";

import { strings } from "core/constants";
import styles from "features/pokemons/styles/PokemonsSearchBar.module.scss";

const PokemonSearchBar: React.FC = () => {
  const navigate = useNavigate();
  const { searchTerm, lastViewedPage, isLoading } =
    useAppSelector(selectPokemons);
  const [currentSearchTerm, setCurrentSearchTerm] =
    useState<string>(searchTerm);
  const { searchBarStrings } =
    strings.pokemonsStrings.pokemonsListScreenStrings;

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainContainer}>
        <input
          className={styles.searchInput}
          placeholder={searchBarStrings.placeholder}
          value={currentSearchTerm}
          onChange={(event) => setCurrentSearchTerm(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              navigate(`/pokemons?${currentSearchTerm}`);
            }
          }}
        />

        <button
          disabled={currentSearchTerm.length < 3 || isLoading}
          onClick={() => {
            navigate(`/pokemons?${currentSearchTerm}`);
          }}
          className={
            currentSearchTerm.length > 2
              ? styles.searchIconFadeIn
              : styles.searchIconFadeOut
          }
        >
          <IoSearchCircleSharp />
        </button>
      </div>
      {searchTerm && !isLoading ? (
        <button
          className={styles.resetButton}
          onClick={() => {
            setCurrentSearchTerm("");
            navigate(`/pokemons/${lastViewedPage}`);
          }}
        >
          {searchBarStrings.resetButton}
        </button>
      ) : null}
    </div>
  );
};

export default PokemonSearchBar;
