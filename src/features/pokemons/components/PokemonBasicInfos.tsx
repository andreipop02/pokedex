import React from "react";

import { strings, images, Pokemon } from "core/constants";

import styles from "features/pokemons/styles/PokemonProfile.module.scss";

interface Props {
  pokemon: Pokemon;
}

const PokemonBasicInfos: React.FC<Props> = ({ pokemon }) => {
  const { basicInfosStrings } = strings.pokemonsStrings.pokemonProfileStrings;

  return (
    <div className={styles.basicInfosContainer}>
      <img
        src={
          pokemon.sprites.other.dream_world.front_default ??
          pokemon.sprites.front_default ??
          images.noPokemonImage
        }
        alt={`${pokemon.name} ${basicInfosStrings.image}`}
        className={styles.pokemonImage}
      />
      <div className={styles.infosContainer}>
        <div className={styles.pokemonName}>{pokemon?.name}</div>
        <div>
          {basicInfosStrings.height} {pokemon.height * 10}{" "}
          {basicInfosStrings.cm}
        </div>
        <div>
          {basicInfosStrings.weight} {(pokemon.weight * 0.1).toFixed(2)}{" "}
          {basicInfosStrings.kg}
        </div>
      </div>
    </div>
  );
};

export default PokemonBasicInfos;
