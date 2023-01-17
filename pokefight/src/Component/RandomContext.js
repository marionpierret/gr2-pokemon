import { createContext, useState } from "react";

export const RandomContext = createContext();

export const RandomController = (props) => {
  const [opponent, setOpponent] = useState([
    {
      name: "",
      id: "",
      stats : "",
    },
  ]);

  

  return (
    <RandomContext.Provider value={[opponent, setOpponent]}>
      {props.children}
    </RandomContext.Provider>
  );
};
