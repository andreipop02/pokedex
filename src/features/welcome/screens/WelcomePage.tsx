import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "store";

import { getPokemonsPage } from "features/pokemons/redux";
import { strings, images } from "core/constants";

import styles from "features/welcome/styles/WelcomePage.module.scss";
import { MainButton } from "components";

const WelcomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { welcomeStrings } = strings;

  useEffect(() => {
    dispatch(getPokemonsPage({ offset: 0, searchTerm: "" }));
  }, []);

  return (
    <div
      className={styles.mainWrapper}
    >
      <img src={images.yellowLightning} className={styles.lightningAnimationBackground} />
      <div className={styles.welcomeContainer}>
        <img src={images.pikachuWaveGif} className={styles.mainImage} alt="pikachu-wave"/>
        <h1 className={styles.welcomeText}>{welcomeStrings.welcomeTitle}</h1>
      </div>

      <div className={styles.catchPhrase}>
        {welcomeStrings.catchPhrase1} <br /> {welcomeStrings.catchPhrase2}
      </div>
      <Link to={"/pokemons/1"}>
        <MainButton
          title={welcomeStrings.actionButton.toUpperCase()}
          className={styles.fadeInAnimation}
        />
      </Link>
    </div>
  );
};

export default WelcomePage;
