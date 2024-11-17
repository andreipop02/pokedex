import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "store";
import { getPokemonsPage, selectPokemons } from "features/pokemons/redux";

import { PokemonListCard } from "features/pokemons/components/";
import { LoaderComponent } from "components";

import styles from "features/pokemons/styles/PokemonsListScreen.module.scss";

const PokemonsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { lastViewedPage, refetchAfterSearch, pokemons, isLoading, error } =
    useAppSelector(selectPokemons);
  const { pageNumber } = useParams();
  const { search } = useLocation();
  const currentSearchTerm = search.substring(1);

  useEffect(() => {
    const fetchPokemons = async () => {
      const offset = pageNumber ? parseInt(pageNumber) - 1 : 0;

      if (currentSearchTerm) {
        await dispatch(
          getPokemonsPage({ offset: 0, searchTerm: currentSearchTerm })
        );
      } else if (refetchAfterSearch && pageNumber) {
        await dispatch(getPokemonsPage({ offset, searchTerm: "" }));
      } else if (pageNumber && lastViewedPage !== parseInt(pageNumber)) {
        await dispatch(getPokemonsPage({ offset, searchTerm: "" }));
      }
    };

    fetchPokemons();
  }, [refetchAfterSearch, currentSearchTerm, pageNumber, dispatch]);

  if (isLoading) {
    return <LoaderComponent />;
  }

  if (error) {
    return <span className={styles.errorText}>{error}</span>;
  }

  return (
    <ul className={styles.pokemonsList}>
      {pokemons.map((pokemon) => {
        return <PokemonListCard pokemon={pokemon} key={pokemon.id} />;
      })}
    </ul>
  );
};

export default PokemonsList;
