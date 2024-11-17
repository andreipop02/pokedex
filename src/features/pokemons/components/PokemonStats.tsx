import React from "react";
import styles from "features/pokemons/styles/PokemonProfile.module.scss";
import { PokemonStat, strings } from "core/constants";

interface Props {
  stats: PokemonStat[];
}

const PokemonStats: React.FC<Props> = ({ stats }) => {
  const { statsStrings } = strings.pokemonsStrings.pokemonProfileStrings;
  return (
    <ul className={styles.statsContainer}>
      <div className={styles.statsTitle}>{statsStrings.mainTitle}</div>
      {stats.map((item) => {
        return (
          <li key={item.stat.name} className={styles.statRow}>
            <span className={styles.statName}>{item.stat.name}</span>
            <span>{item.base_stat}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonStats;
