import { createContext, useState } from "react";

export const RandomContext = createContext();

export const RandomController = (props) => {
  const [opponent, setOpponent] = useState([
    {
      name: "",
      id: "",
      hp: "",
      attack: "",
      defense: "",
      specialAttack: "",
      specialDefense: "",
      speed : "",
    },
  ]);

  

  return (
    <RandomContext.Provider value={[opponent, setOpponent]}>
      {props.children}
    </RandomContext.Provider>
  );
};
