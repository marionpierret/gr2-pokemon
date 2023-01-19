import { useContext, useState, useEffect } from "react";
import { PokemonContext } from "./PokemonContext";
import { RandomContext } from "./RandomContext";
import axios from "axios";
import NavBar from "./NavBar";

const Fight = () => {
  const [pokemon, setPokemon] = useContext(PokemonContext);
  const [opponent, setOpponent] = useContext(RandomContext);
  const [movePlayer, setMovePlayer] = useState([]);
  const [moveOpponent, setMoveOpponent] = useState([]);
  const [slice, setSlice] = useState({ start: "0", end: "4" });
  const [powerAttack, setPowerAttack] = useState(0);
  const [opponentPowerAttack, setOpponentPowerAttack] = useState("");
  const [loading, setLoading] = useState(false);
  const [opponentNameAttack, setOpponentNameAttack] = useState("initial");
  const [nameAttack, setNameAttack] = useState("initial");
  const [winner, setWinner] = useState({ name: "", src: "" });
  const [degats, setDegats] = useState(0);
  const [degatsOpponent, setDegatsOpponent] = useState(0);
  const [viePlayer, setViePlayer] = useState(pokemon.hp);
  const [vieOpponent, setVieOpponent] = useState(opponent.stats[0].base_stat);
  const [loadingAttack, setLoadingAttack] = useState(false);
  const [loadingMove, setLoadingMove] = useState(false);
  const [urlAndName, setUrlAndName] = useState({ name: "", url: "" });
  const [displayMove,setDisplayMove] = useState(true);
  const [count,setCount] = useState(0)

  const fetchMovePlayer = async () => {
    try {
      const callData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
      );
      setMovePlayer(callData.data.moves);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchMoveOpponent = async () => {
    try {
      const callData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${opponent.id}`
      );
      setMoveOpponent(callData.data.moves);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMoveDetails = async (url, name) => {
    await axios.get(`${url}`).then((res) => {
      setPowerAttack(res.data.power);
      setNameAttack(name);
      setLoading(true);
    });
  };

  const fetchMoveOpponentDetails = async () => {
    const random = Math.floor(Math.random() * moveOpponent.length);
    try {
      const callData = await axios.get(`${moveOpponent[random].move.url}`);
      setOpponentPowerAttack(callData.data.power);
      setOpponentNameAttack(moveOpponent[random].move.name);
      setLoadingMove(true);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmOpponentAttack = async () => {
    // let cf = (Math.random() * (1.15 - 0.85) + 0.85)
    // let hisAttack1 = (opponent.stats[1].base_stat + opponent.stats[3].base_stat)/2
    // let hisAttack2 = ((parseInt(pokemon.defense) + parseInt(pokemon.specialDefense))/2)/2
    // let degatsSubis = Math.ceil((((opponent.stats[1].base_stat + opponent.stats[3].base_stat)/2) - (((parseInt(pokemon.defense) + parseInt(pokemon.specialDefense))/2)/2))*(Math.random() * (1.15 - 0.85) + 0.85))
    await setDegatsOpponent(Math.ceil(Math.abs((((opponent.stats[1].base_stat + opponent.stats[3].base_stat)/2) - (((parseInt(pokemon.defense) + parseInt(pokemon.specialDefense))/2)/2)))*(Math.random() * (1.15 - 0.85) + 0.85)));
   
   if (viePlayer > 0) {
      await setViePlayer(viePlayer - degatsOpponent);
    } else if (viePlayer <= 0) {
      await setViePlayer(0);
    }
  };

  // const changeLife = async (vieOpponent, degats) => {
  //   await setVieOpponent(vieOpponent - degats);
  //   setLoadingAttack(true);
  // };
console.log(degats)
console.log(degatsOpponent)
  const confirmAttack = async () => {
    let cf = Math.random() * (1.15 - 0.85) + 0.85
    let myAttack1 = (parseInt(pokemon.attack) + parseInt(pokemon.specialAttack))/2
    // console.log(myAttack1)
    let myAttack2 = ((opponent.stats[2].base_stat+opponent.stats[4].base_stat)/2)/2
    // console.log(myAttack2)
    let degatsInflige = Math.ceil((Math.abs(myAttack1-myAttack2))*cf)
    setDegats(degatsInflige)
    

    console.log(degatsInflige)
if (vieOpponent - degats > 0) {
      await setVieOpponent(vieOpponent - degats);

      const random = Math.floor(Math.random() * movePlayer.length);

      await setSlice((prevState) => ({
        ...prevState,
        start: random,
        end: random + 4,
      }));
    } else if (vieOpponent - degats <= 0) {
      await setVieOpponent(0);
    }
  };
  const checkDeath = async () => {
    if (vieOpponent <= 0) {
      setWinner((prevState) => ({
        ...prevState,
        name: pokemon.name,
        src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      }));
    } else if (viePlayer <= 0) {
      setWinner((prevState) => ({
        ...prevState,
        name: opponent.name,
        src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${opponent.id}.png`,
      }));
    }
  };

  const attack = async (event, url, name) => {
    event.preventDefault();

    let promise = await Promise.all([
      fetchMoveOpponentDetails(),
      fetchMoveDetails(url, name),
      setDisplayMove(false)
    ]).then((resp) => console.log(resp));
    return promise;
  };

  const validAttack = async (event) => {
    event.preventDefault();
    let promise = await Promise.all([
      confirmAttack(),
      confirmOpponentAttack(),
      setLoading(false),
      setDisplayMove(true)
    ]).then((resp) => console.log(resp));
    return promise;
  };

  useEffect(() => {
    fetchMovePlayer();
    fetchMoveOpponent();
  }, []);

  useEffect(() => {
    vieOpponent <= 0 && checkDeath();
    viePlayer <= 0 && checkDeath();
  }, [vieOpponent, viePlayer]);


  return (
    <div>
      <NavBar />
      <h1>Ready to fight</h1>

      {winner.name === "" ? (
        <>
          <div className="lifeBar">
            <div id="pwidget">
              <div id="progressnum">{`${viePlayer} PV`}</div>
              <div id="progressbar">
                <div
                  id="indicator"
                  style={{width : viePlayer > 0
                      ? `${(viePlayer * 100) / pokemon.hp}%`
                      : "0%"} }
                ></div>
              </div>
            </div>
            <div id="pwidget-opponent">
              <div id="progressnum-opponent">{`${vieOpponent} PV`}</div>
              <div id="progressbar-opponent">
                <div
                  id="indicator-opponent"
                  style={{width : vieOpponent > 0
                      ? `${(vieOpponent * 100) / opponent.stats[0].base_stat}%`
                      : "0%"} 
                  }
                ></div>
              </div>
            </div>
          </div>
          <div className="arene">
            <div className="movePlayer">
              {displayMove && movePlayer.slice(slice.start, slice.end).map((e, i) => (
                <div className="sectionAttack">
                  <div className="Attack">
                    <button
                      onClick={
                        (event) => {
                          //           setUrlAndName((prevState) => ({
                          //             ...prevState,
                          // name: e.move.name,
                          // src: e.move.url,
                          //         }))
                          attack(event, e.move.url, e.move.name);
                        }

                        //  debounce(attack(event,e.move.url,e.move.name), 300)
                      }
                    >
                      {e.move.name}
                    </button>
                  </div>
                  {/* <div>
                {nameAttack === e.move.name && (
                  <button onClick={() => confirmAttack()}>
                    Lancer l'attaque?
                  </button>
                )}
              </div> */}
                </div>
              ))}
            </div>

            <div className="arene">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokemon.id}.png`}
                width={"150px"}
                alt="pokemonBack"
              />

              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${opponent.id}.png`}
                width={"150px"}
                alt="pokemonBack"
              />
            </div>

            {/* <div className="moveOpponent">
          {moveOpponent.slice(0, 4).map((e, i) => (
            <button>{e.move.name}</button>
          ))}
        </div> */}
          </div>
          <div>
          {loading && (
              <div className="selectTypeBattle">
                <h4>{`${pokemon.name} a attaqué ${
                  opponent.name
                } avec ${nameAttack}, ${
                  degats === 0
                    ? "l'attaque n'a eu aucun effet"
                    : `${
                        degats> 60
                          ? `Attention attaque critique :`
                          : degats< 30
                          ? `Attaque mineure :`
                          : ""
                      } 
            l'attaque a retiré ${degats} de PV`
                }`}</h4>
 </div>
            )}
          </div>
          <div>
            {loading && (
              <div className="selectTypeBattle">
                <h4>{`${opponent.name} a attaqué ${
                  pokemon.name
                } avec ${opponentNameAttack}, ${
                  degatsOpponent === 0
                    ? "l'attaque n'a eu aucun effet"
                    : `${
                        degatsOpponent > 60
                          ? `Attention attaque critique :`
                          : degatsOpponent < 30
                          ? `Attaque mineure :`
                          : ""
                      } 
            l'attaque a retiré ${degatsOpponent} de PV`
                }`}</h4>
              </div>
            )}
            {loading && (
              <div>
                <button onClick={(event) => validAttack(event)}>
                  Tour suivant
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div>
          <h2>Le gagnant est : {winner.name}</h2>
          <img src={winner.src} alt="winner" />
        </div>
      )}
    </div>
  );
};

export default Fight;
