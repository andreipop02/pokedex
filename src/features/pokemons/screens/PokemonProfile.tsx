import React, { memo, useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store";

import {
  getCurrentPokemonProfile,
  selectPokemons,
} from "features/pokemons/redux";
import {
  PokemonBasicInfos,
  PokemonInfosList,
  PokemonStats,
} from "features/pokemons/components";

import { LoaderComponent, MainButton } from "components";

import { strings } from "core/constants";
import { colorPalette } from "core/theme";

import styles from "features/pokemons/styles/PokemonProfile.module.scss";

const PokemonProfile: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, currentPokemonProfile, error, lastViewedPage } =
    useAppSelector(selectPokemons);
  const { pokemonName } = useParams();

  const { pokemonProfileStrings } = strings.pokemonsStrings;

  useEffect(() => {
    if (pokemonName && pokemonName !== currentPokemonProfile.name) {
      dispatch(getCurrentPokemonProfile({ pokemonName }));
    }
  }, [pokemonName, dispatch]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 30, left: 0, behavior: "instant" });
  }, []);

  if (isLoading) {
    return (
      <div className={styles.mainWrapper}>
        <LoaderComponent />;
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.mainWrapper}>
        <div className={styles.errorText}>{error}</div>
        <MainButton
          title={pokemonProfileStrings.actionButton.toUpperCase()}
          onClick={() => navigate(`/pokemons/${lastViewedPage}`)}
        />
      </div>
    );
  }

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.pokemonProfileContainer}>
        <PokemonBasicInfos pokemon={currentPokemonProfile} />

        <PokemonStats stats={currentPokemonProfile.stats} />

        <PokemonInfosList
          details={currentPokemonProfile.types}
          title={pokemonProfileStrings.types}
          color={colorPalette.listColor1}
        />
        <PokemonInfosList
          details={currentPokemonProfile.abilities}
          title={pokemonProfileStrings.abilities}
          color={colorPalette.listColor3}
        />

        <div className={styles.experienceStat}>
          {pokemonProfileStrings.exp}
          <div className={styles.pokemonExpGain}>
            {currentPokemonProfile.base_experience}
          </div>
        </div>
      </div>

      <MainButton
        title={pokemonProfileStrings.actionButton.toUpperCase()}
        onClick={() =>
          navigate(`/pokemons/${lastViewedPage}`, { preventScrollReset: true })
        }
      />
    </div>
  );
});

export default PokemonProfile;
