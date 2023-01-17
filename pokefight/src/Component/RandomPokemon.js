import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import PokeDex from "./PokeDex";

const RandomPokemon = () => {
  const searchBtn = document.getElementById("search-btn"); // search button
  const inputField = document.getElementById("name-input"); // search field input
  const nameScreen = document.getElementById("name-screen"); //name-screen
  const imageScreen = document.getElementById("main-screen"); // image screen
  const aboutScreen = document.getElementById("about-screen"); // about-text screen
  const typeScreen = document.getElementById("type-screen"); // type screen
  const idScreen = document.getElementById("id-screen"); // spices screen

  const randomNumber = Math.floor(Math.random() * 1010);
  console.log(randomNumber);

  const [random, setRandom] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRandomPokemon = async () => {
    try {
      const callPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomNumber}/`
      );
      setRandom(callPokemon.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  console.log(random);

  return (
    <div>
      <PokeDex {...random}/>
    </div>
  );
};

export default RandomPokemon;
