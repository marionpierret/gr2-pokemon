import { useContext, useState, useEffect } from "react";
import { PokemonContext } from "./PokemonContext";
import { RandomContext } from "./RandomContext";
import axios from "axios";
import NavBar from "./NavBar";
import Monde from "../Images/pokemonWorld.png"
import { TrainerContext } from "./TrainerContext";
import MenWin from "../Images/MenWin.png"
import WomenWin from "../Images/VitoireFemme.png"

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
  const [degats, setDegats] = useState(
    Math.ceil(
      Math.abs(
        (parseInt(pokemon.attack) + parseInt(pokemon.specialAttack)) / 2 -
          (opponent.stats[2].base_stat + opponent.stats[4].base_stat) / 2 / 2
      ) *
        (Math.random() * (1.15 - 0.85) + 0.85)
    )
  );
  const [degatsOpponent, setDegatsOpponent] = useState(
    Math.ceil(
      Math.abs(
        (opponent.stats[1].base_stat + opponent.stats[3].base_stat) / 2 -
          (parseInt(pokemon.defense) + parseInt(pokemon.specialDefense)) / 2 / 2
      ) *
        (Math.random() * (1.15 - 0.85) + 0.85)
    )
  );
  const [viePlayer, setViePlayer] = useState(pokemon.hp);
  const [vieOpponent, setVieOpponent] = useState(opponent.stats[0].base_stat);
  const [loadingAttack, setLoadingAttack] = useState(false);
  const [loadingMove, setLoadingMove] = useState(false);
  const [urlAndName, setUrlAndName] = useState({ name: "", url: "" });
  const [displayMove, setDisplayMove] = useState(true);
  const [count, setCount] = useState(1);
  const [count1, setCount1] = useState(1);
  const [trainer, setTrainer] = useContext(TrainerContext);

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
    setCount1(Math.floor(Math.random() * 3));
    count1 === 0
      ? setDegatsOpponent(0)
      : setDegatsOpponent(
          Math.ceil(
            Math.abs(
              (opponent.stats[1].base_stat + opponent.stats[3].base_stat) / 2 -
                (parseInt(pokemon.defense) + parseInt(pokemon.specialDefense)) /
                  2 /
                  2
            ) *
              (Math.random() * (1.15 - 0.85) + 0.85)
          )
        );

    if (viePlayer - degatsOpponent > 0) {
      await setViePlayer(viePlayer - degatsOpponent);
    } else if (viePlayer - degatsOpponent <= 0) {
      await setViePlayer(0);
    }
  };

  // const changeLife = async (vieOpponent, degats) => {
  //   await setVieOpponent(vieOpponent - degats);
  //   setLoadingAttack(true);
  // };

  const confirmAttack = async () => {
    let cf = Math.random() * (1.15 - 0.85) + 0.85;
    let myAttack1 =
      (parseInt(pokemon.attack) + parseInt(pokemon.specialAttack)) / 2;
    // console.log(myAttack1)
    let myAttack2 =
      (opponent.stats[2].base_stat + opponent.stats[4].base_stat) / 2 / 2;
    // console.log(myAttack2)
    let degatsInflige = Math.ceil(Math.abs(myAttack1 - myAttack2) * cf);
    setCount(Math.floor(Math.random() * 4));
    count === 0 ? setDegats(0) : setDegats(degatsInflige);


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
    if (viePlayer - vieOpponent > 0) {
      setWinner((prevState) => ({
        ...prevState,
        name: pokemon.name,
        src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
        winnerGame : "Player"
      }));
    } else if (vieOpponent - viePlayer > 0) {
      setWinner((prevState) => ({
        ...prevState,
        name: opponent.name,
        src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${opponent.id}.png`,
        winnerGame : "Opponent"
      }));
    }
  };

  const attack = async (event, url, name) => {
    event.preventDefault();

    let promise = await Promise.all([
      fetchMoveOpponentDetails(),
      fetchMoveDetails(url, name),
      setDisplayMove(false),
    ]).then((resp) => console.log(resp));
    return promise;
  };

  const validAttack = async (event) => {
    event.preventDefault();
    let promise = await Promise.all([
      confirmAttack(),
      confirmOpponentAttack(),
      setLoading(false),
      setDisplayMove(true),
    ]).then((resp) => console.log(resp));
    return promise;
  };

  useEffect(() => {
    fetchMovePlayer();
    fetchMoveOpponent();
  }, []);

  useEffect(() => {
    vieOpponent <= 0 && checkDeath();
  }, [vieOpponent, viePlayer]);

  useEffect(() => {
  viePlayer <= 0 && checkDeath();
}, [vieOpponent, viePlayer]);
  return (
    <div className="fight">
      <NavBar />
      

      {winner.name === "" ? (
        <>
        <div>
        <h1>Ready to fight</h1>
        </div>
          <div className="lifeBar">
            <div id="pwidget">
              <div id="progressnum">{`${viePlayer} PV`}</div>
              <div id="progressbar">
                <div
                  id="indicator"
                  style={{
                    width:
                      viePlayer > 0
                        ? `${(viePlayer * 100) / pokemon.hp}%`
                        : "0%",
                  }}
                ></div>
              </div>
            </div>
            <div id="pwidget-opponent">
            <div id="progressnum-opponent">{`${vieOpponent} PV`}</div>
              <div id="progressbar-opponent">
                <div
                  id="indicator-opponent"
                  style={{
                    width:
                      vieOpponent > 0
                        ? `${
                            (vieOpponent * 100) / opponent.stats[0].base_stat
                          }%`
                        : "0%",
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="areneGlobal">


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
          <div className="movePlayer">
              {displayMove &&
                movePlayer.slice(slice.start, slice.end).map((e, i) => (
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
            {loading && (
              <div className="selectTypeBattle">
                <h4 style={{color : "#0a681f"}}>
                {`${pokemon.name} a attaqué ${
                  opponent.name
                } avec ${nameAttack}, ${
                  degats === 0
                    ? "l'attaque n'a eu aucun effet"
                    : `${
                        degats > 60
                          ? `Attention attaque critique :`
                          : degats < 30
                          ? `Attaque mineure :`
                          : ""
                      } 
            l'attaque a retiré ${degats} de PV`
                }`}
                </h4>
              </div>
            )}
          </div>
          <div>
            {loading && (
              <div className="selectTypeBattle">
                <h4 style={{color : "#fc1706"}}>{`${opponent.name} a attaqué ${
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
              <div className="Attack">
                <button onClick={(event) => validAttack(event)}>
                  Tour suivant
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
        <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png"
          alt="logo"
          style={{ height: "150px" }}
        />
        <div className="selectTypeBattle">
          <h4>Le gagnant est : {winner.name.toUpperCase()}{winner.winnerGame === "Player" && `, Bravo dresseur ${trainer.name}`} </h4>
        </div>
        {/* <div className="winner"> */}
          
          {/* </div> */}
        </div>
        <div>
        {trainer.picture === "dresseurHomme" && winner.winnerGame === "Player" && <img src={MenWin} width={"250px"} alt="MenWin"/>}
        {trainer.picture === "dresseurFemme" && winner.winnerGame === "Player" && <img src={WomenWin} width={"250px"} alt="MenWin"/>}
        <img src={winner.src}  width={"250px"} alt="winner" />
        </div>
        <div className="world">
        
        </div>
        </>
      )}
    </div>
  );
};

export default Fight;
