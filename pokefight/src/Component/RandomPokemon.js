import { useState, useEffect,useContext } from "react";
import axios from "axios";
import "../App.css";
import PokeDex from "./PokeDex";
import { RandomContext } from "./RandomContext";

const RandomPokemon = () => {
 

  const randomNumber = Math.floor(Math.random() * 1010);
  // console.log(randomNumber);
  const [opponent, setOpponent] = useContext(RandomContext)
  const [random, setRandom] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRandomPokemon = async () => {
    try {
      const callPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomNumber}/`
      );
      setRandom(callPokemon.data);
      setLoading(true);
      setOpponent((prevState) => ({
        name: callPokemon.name,
        id: callPokemon.id,
        hp: "",
        attack: "",
        defense: "",
        specialAttack: "",
        specialDefense: "",
        speed : ""
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

 console.log(random)

  return (
    <div>
      
    </div>
  );
};

export default RandomPokemon;
