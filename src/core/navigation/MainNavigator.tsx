import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "features/welcome/screens/WelcomePage";
import PokemonsListScreen from "features/pokemons/screens/PokemonsListScreen";
import PokemonProfile from "features/pokemons/screens/PokemonProfile";

const MainNavigator: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<WelcomePage />} />

      <Route path="/pokemons/:pageNumber" element={<PokemonsListScreen />} />
      <Route path="/pokemons" element={<PokemonsListScreen />} />
      <Route path="/pokemon/:pokemonName" element={<PokemonProfile />} />
    </Routes>
  </BrowserRouter>
);

export default MainNavigator;
