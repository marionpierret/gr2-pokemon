import { createContext, useState } from "react";

export const TrainerContext = createContext();

export const TrainerController = (props) => {
  const [trainer, setTrainer] = useState([
    {
      name: "",
      picture: "",
    },
  ]);

  

  return (
    <TrainerContext.Provider value={[trainer, setTrainer]}>
      {props.children}
    </TrainerContext.Provider>
  );
};
