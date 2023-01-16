import { useState, useEffect } from "react";
import axios from "axios";

const RandomPokemon = () => {
  const randomNumber = Math.floor(Math.random() * 1010);
  console.log(randomNumber)

  const [random, setRandom] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchRandomPokemon = async () => {
    try {
      const callPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomNumber}/`
      );
      setRandom(callPokemon.data);
      setLoading(true)
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
      {/* <h1>{random.name}</h1>
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
          );
        })
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
          );
        })
      ) : (
        <p>Stats not available</p>
      )} */}

      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="title">{random.name}</p>
            {loading && (
              <img src={`${random.sprites.front_default}`} alt="logoPokemon" />
            )}
          </div>
          <div className="flip-card-back">
            <p className="title">Stats</p>
            <div>
              {/* <Stats
                id={e.pokemon.url
                  .substr(34, e.pokemon.url.length)
                  .replace("/", "")}
              /> */}
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {details.map((e, i) => (
                  <div key={i} style={{ border: "1px solid black" }}>
                    <h5>{e.stat.name} :</h5>
                    <p>Value : {e.base_stat}</p>
                    <p>Effort :{e.base_stat}</p>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomPokemon;
