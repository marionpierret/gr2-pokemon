import { useState, useEffect } from "react";
import axios from "axios";

const RandomPokemon = () => {
  const randomNumber = Math.floor(Math.random() * 1010);

  const [random, setRandom] = useState([]);

  const fetchRandomPokemon = async () => {
    try {
      const callPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomNumber}/`
      );
      setRandom(callPokemon.data);
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
      <h1>{random.name}</h1>
      {random.abilities ? (
        random.abilities.map((e, i) => {
          return (
            <div key={i}>
              <p>{e.ability.name}</p>
            </div>
          );
        })
      ) : (
        <p>No abilities</p>
      )}
      {random.types ? (
        random.types.map((e, i) => {
          return (
            <div key={i}>
            <p>{e.type.name}</p>
            </div>
        )})
      ) : (
        <p>Types not available</p>
      )}
      {random.stats ? (
        random.stats.map((e, i) => {
          return (
            <div key={i}>
                <p>{e.stat.name}</p>
                <p>{e.base_stat}</p>
                <p>{e.effort}</p>
            </div>
          )
        })
      ) : (
        <p>Stats not available</p>
      )}
    </div>
  );
};

export default RandomPokemon;
