import React from "react";
import { PokemonAbility, PokemonType } from "core/constants";
import styles from "features/pokemons/styles/PokemonProfile.module.scss";

interface Props {
  details: PokemonType[] | PokemonAbility[];
  title: string;
  color: string;
}

const PokemonInfosList: React.FC<Props> = ({ details, title, color }) => {
  return (
    <ul className={styles.infosListContainer}>
      <div>{title}</div>
      {details.map((item, index) => {
        const name = "ability" in item ? item.ability.name : item.type.name;
        return (
          <li key={index}>
            <span
              className={styles.pokemonInfo}
              style={{ backgroundColor: color }}
            >
              {name}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonInfosList;
