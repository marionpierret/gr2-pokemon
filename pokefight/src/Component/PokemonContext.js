import { createContext, useState } from "react";

export const PokemonContext = createContext();

export const PokemonController = (props) => {
  const [pokemon, setPokemon] = useState([
    {
      name: "",
      id: "",
      hp: "",
      stats: ""
    },
  ]);

  return (
    <PokemonContext.Provider value={[pokemon, setPokemon]}>
      {props.children}
    </PokemonContext.Provider>
  );
};
