import { useContext, useState, useEffect } from "react";
import { PokemonContext } from "./PokemonContext";
import { RandomContext } from "./RandomContext";
import axios from "axios";
import NavBar from "./NavBar";
import debounce from 'lodash.debounce'

const Fight = () => {
  const [pokemon, setPokemon] = useContext(PokemonContext);
  const [opponent, setOpponent] = useContext(RandomContext);
  const [movePlayer, setMovePlayer] = useState([]);
  const [moveOpponent, setMoveOpponent] = useState([]);
  const [slice, setSlice] = useState({ start: "0", end: "4" });
  const [powerAttack, setPowerAttack] = useState("");
  const [opponentPowerAttack, setOpponentPowerAttack] = useState("");
  const [loading, setLoading] = useState(false);
  const [opponentNameAttack, setOpponentNameAttack] = useState("initial");
  const [nameAttack, setNameAttack] = useState("initial");
  const [winner, setWinner] = useState({name : "",src : ""});
  const [degats, setDegats] = useState(0)
  const [degatsOpponent, setDegatsOpponent] = useState(0)
  const [viePlayer,setViePlayer] = useState(pokemon.hp)
  const [vieOpponent,setVieOpponent] = useState(opponent.stats[0].base_stat)
  const [loadingAttack, setLoadingAttack] = useState(false)
  const [urlAndName, setUrlAndName] = useState({name : "" , url : ""})
 
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

console.log(loading)
console.log(viePlayer)
console.log(urlAndName.url)

  const fetchMoveDetails = async () => {
    try {
      const callData = await axios.get(`${urlAndName.src}`);
      setPowerAttack(callData.data.power);
      setNameAttack(urlAndName.name);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMoveOpponentDetails = async () => {
    const random = Math.floor(Math.random() * moveOpponent.length);
    try {
      const callData = await axios.get(`${moveOpponent[random].move.url}`);
      setOpponentPowerAttack(callData.data.power);
      setOpponentNameAttack(moveOpponent[random].move.name);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmOpponentAttack = async () => {
    let coeffMultiplicateur = Math.random() * (1 - 0.85) + 0.85;
    await setDegatsOpponent(Math.ceil(((((opponent.stats[4].base_stat*0.4+2)*opponent.stats[3].base_stat*opponentPowerAttack)/(opponent.stats[2].base_stat)/50)+2)*coeffMultiplicateur))
    if (opponentPowerAttack === null) {
      return;
    }
    else if(viePlayer > 0) {
      await setViePlayer(viePlayer - degatsOpponent)
    }
    else if(viePlayer <= 0) {
      await setViePlayer(0)
    }

  }

  const changeLife = async (vieOpponent, degats) => {
    await setVieOpponent(vieOpponent - degats)
    setLoadingAttack(true)
   }

  const confirmAttack = async () => {
  
    let coeffMultiplicateur = Math.random() * (1 - 0.85) + 0.85;
   setDegats(Math.ceil(((((pokemon.specialDefense*0.4+2)*pokemon.specialAttack*powerAttack)/(pokemon.defense)/50)+2)*coeffMultiplicateur))
  
    if (powerAttack === null) {
      const random = Math.floor(Math.random() * movePlayer.length);
    await  setSlice((prevState) => ({
        ...prevState,
        start: random,
        end: random + 4,
      }), slice);
      return
    }
    else if (vieOpponent - degats > 0) {
    await changeLife(vieOpponent, degats)
    console.log(vieOpponent)

    const random = Math.floor(Math.random() * movePlayer.length);

    await setSlice((prevState) => ({
      ...prevState,
      start: random,
      end: random + 4,
    }));

  }
  else if (vieOpponent - degats <= 0) {
    await setVieOpponent(0);
  }

  }
  const checkDeath = async () => {
      if(vieOpponent <= 0){
        setWinner((prevState) => ({
          ...prevState,
          name: pokemon.name,
          src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
        }))
      }
      else if(viePlayer <= 0){
        setWinner((prevState) => ({
          ...prevState,
          name: opponent.name,
          src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${opponent.id}.png`,
        }))
      }
      };

  // const attack = async (event, url,name) => {
  //   event.preventDefault()
  //   let promise = await Promise.all([
  //     await fetchMoveDetails(url, name),
  //     await confirmAttack(),
  //      fetchMoveOpponentDetails(),
  //      confirmOpponentAttack(),
  //      checkDeath(),
  //      setVieOpponent(vieOpponent - degats)
  //   ]).then((resp) => console.log(resp))
  //   return promise
  // }

  useEffect(() => {
    fetchMovePlayer();
    fetchMoveOpponent();
  }, []);

    useEffect(() => {
      urlAndName.name !== "" &&
      fetchMoveDetails();
     confirmAttack();
       fetchMoveOpponentDetails();
       confirmOpponentAttack();
       checkDeath();
  }, [urlAndName]);



  return (
    <div>
      <NavBar/>
      <h1>Ready to fight</h1>
      
      
      {winner.name === "" ?
      <>
      <div className="lifeBar">
        <div id="pwidget">
          <div id="progressnum">{`${viePlayer} PV`}</div>
          <div id="progressbar">
            <div id="indicator" width = {viePlayer >0 ? `${(viePlayer * 100)/pokemon.hp}%` : `0%`}></div>
          </div>
        </div>
        <div id="pwidget-opponent">
          <div id="progressnum-opponent">
            {`${vieOpponent } PV`}
          </div>
          <div id="progressbar-opponent">
            <div id="indicator-opponent" width={vieOpponent >0 ?`${(vieOpponent * 100)/opponent.stats[0].base_stat}%` : "0%"}></div>
          </div>
        </div>
      </div>
      <div className="arene">
        <div className="movePlayer">
          {movePlayer.slice(slice.start, slice.end).map((e, i) => (
            <div className="sectionAttack">
              <div className="Attack">
                <button
                  onClick={() => 
                    setUrlAndName((prevState) => ({
          name: e.move.name,
          src: e.move.url,
        }))
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
        {loading &&
          `${pokemon.name} à attaquer ${opponent.name} avec ${nameAttack}, ${
            powerAttack === null
              ? "l'attaque n'a eu aucun effet"
              : `${degats >60 ? `Attention attaque critique :` 
              : degats < 30 ? `Attaque mineure :` 
              : ''} 
              l'attaque à retirer ${degats} de PV`
          }`} 
      </div>
      <div>
        {loading &&
          `${opponent.name} à attaquer ${
            pokemon.name
          } avec ${opponentNameAttack}, ${
            opponentPowerAttack === null
            ? "l'attaque n'a eu aucun effet"
            : `${degatsOpponent >60 ? `Attention attaque critique :` 
            : degatsOpponent < 30 ? `Attaque mineure :` 
            : ''} 
            l'attaque à retirer ${degatsOpponent} de PV`
          }`}
          {/* {loading && <button onClick={() => displayAttack()}>Ok?</button>} */}
      </div>
   
    </>
     :
    <div>
        <h2>Le gagnant est : {winner.name}</h2>
        <img src={winner.src} alt="winner" />
    </div>
      }
      </div>
  );
};

export default Fight;
