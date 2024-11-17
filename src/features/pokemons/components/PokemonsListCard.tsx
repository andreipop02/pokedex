import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { strings, images, Pokemon } from "core/constants";

import styles from "features/pokemons/styles/PokemonsListCard.module.scss";
import { colorPalette } from "core/theme";
import { MainButton } from "components";

interface Props {
  pokemon: Pokemon;
}

const PokemonListCard: React.FC<Props> = ({ pokemon }) => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [fillPercentage, setFillPercentage] = useState<number>(0);
  const { listCardStrings } = strings.pokemonsStrings.pokemonsListScreenStrings;

  const handleAudioPlay = (audioUrl: string, pokemonId: number) => {
    if (playingId === pokemonId) return;

    const audio = new Audio(audioUrl);
    setPlayingId(pokemonId);
    audio.volume = 0.1;
    audio.play().catch((err) => {
      console.error("Audio playback failed:", err);
    });

    const interval = setInterval(() => {
      setFillPercentage((audio.currentTime / audio.duration) * 100);
    }, 1);

    audio.addEventListener("ended", () => {
      clearInterval(interval);
      setPlayingId(null);
      setFillPercentage(0);
    });
  };

  const getButtonBackground = (fillPercentage: number) =>
    fillPercentage
      ? `linear-gradient(to left, #ffffff ${100 - fillPercentage}%, ${
          colorPalette.mainButtonColor
        } ${100 - fillPercentage}%)`
      : colorPalette.mainButtonColor;

  useEffect(() => {
    return () => {
      setPlayingId(null);
    };
  }, []);

  return (
    <li className={styles.pokemonCard}>
      <Link to={`/pokemon/${pokemon.name}`} className={styles.linkContainer}>
        <div className={styles.pokemonName}>{pokemon.name}</div>
        <img
          className={styles.pokemonImage}
          src={
            pokemon.sprites.other.dream_world.front_default ??
            pokemon.sprites.front_default ??
            images.noPokemonImage
          }
          alt={pokemon.name}
        />
        <div className={styles.pokemonTypes}>
          {pokemon.types.map((type) => (
            <div key={type.type.name} className={styles.pokemonType}>
              {type.type.name}
            </div>
          ))}
        </div>
      </Link>
      {pokemon.cries?.latest && (
        <MainButton
          onClick={() => handleAudioPlay(pokemon.cries.latest, pokemon.id)}
          disabled={playingId === pokemon.id}
          style={{
            background: getButtonBackground(fillPercentage),
          }}
          title={
            playingId === pokemon.id
              ? listCardStrings.playing
              : listCardStrings.play
          }
          className={styles.playButton}
        />
      )}
    </li>
  );
};

export default PokemonListCard;
