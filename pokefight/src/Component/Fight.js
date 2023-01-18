import { useContext, useState, useEffect } from "react";
import { PokemonContext } from "./PokemonContext";
import { RandomContext } from "./RandomContext";
import axios from "axios";

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
  // const [vieOpponent,setVieOpponent] = useState(opponent.stats[0].base_stat)

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

  useEffect(() => {
    fetchMovePlayer();
    fetchMoveOpponent();
  }, []);

  const fetchMoveDetails = async (url, attack) => {
    try {
      const callData = await axios.get(`${url}`);
      setPowerAttack(callData.data.power);
      setNameAttack(attack);
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

  const confirmOpponentAttack = () => {
    let coeffMultiplicateur = Math.random() * (1 - 0.85) + 0.85;
    setDegatsOpponent(Math.ceil(((((opponent.stats[4].base_stat*0.4+2)*opponent.stats[3].base_stat*opponentPowerAttack)/(opponent.stats[2].base_stat)/50)+2)*coeffMultiplicateur))
    // let playerPvinit = pokemon.hp
    let actualprogress = parseInt(
      document.querySelector("#progressnum").innerHTML.replace("PV", "")
    );
    let indicator = document.querySelector("#indicator");

    if (opponentPowerAttack === null) {
      return;
    }
    else if (opponentPowerAttack > 0) {
      let newActualprogress = actualprogress - degatsOpponent;
      setViePlayer(actualprogress - degatsOpponent)
        indicator.style.width = `${(newActualprogress * 100)/pokemon.hp}%`;
        document.querySelector("#progressnum").innerHTML = `${Math.floor(
          newActualprogress
        )} PV`

    }
    if (actualprogress <= 0) {
      indicator.style.width = `${0}%`;
      document.querySelector("#progressnum").innerHTML = `${0} PV`
    }  

  }

  // const displayOpponentAttack = () =>{

  // }



  const confirmAttack = () => {
    let coeffMultiplicateur = Math.random() * (1 - 0.85) + 0.85;
  setDegats(Math.ceil(((((pokemon.specialDefense*0.4+2)*pokemon.specialAttack*powerAttack)/(pokemon.defense)/50)+2)*coeffMultiplicateur))
   let opponentPvinit = opponent.stats[0].base_stat
    let actualprogress = parseInt(
      document
        .querySelector("#progressnum-opponent")
        .innerHTML.replace("PV", "")
    ); 
    let indicator = document.querySelector("#indicator-opponent");

    if (powerAttack === null) {
      const random = Math.floor(Math.random() * movePlayer.length);
      setSlice((prevState) => ({
        ...prevState,
        start: random,
        end: random + 4,
      }));
      return
    }
    else if (powerAttack > 0) {
      let newActualprogress = actualprogress - degats;
      indicator.style.width = `${(newActualprogress * 100)/opponentPvinit}%`;
      document.querySelector(
        "#progressnum-opponent"
      ).innerHTML = `${Math.floor(newActualprogress)} PV`;
     
      }
        if (actualprogress <= 0) {
      indicator.style.width = `${0}%`;
      document.querySelector("#progressnum-opponent").innerHTML = `${0} PV`
    } 
    const random = Math.floor(Math.random() * movePlayer.length);

    setSlice((prevState) => ({
      ...prevState,
      start: random,
      end: random + 4,
    }));
  };

  // const displayAttack = () => {
  //   let opponentPvinit = opponent.stats[0].base_stat
  //   let actualprogress = parseInt(
  //     document
  //       .querySelector("#progressnum-opponent")
  //       .innerHTML.replace("PV", "")
  //   ); 
  //   let indicator = document.querySelector("#indicator-opponent");
  //   if (powerAttack === null) {
  //     const random = Math.floor(Math.random() * movePlayer.length);
  //     setSlice((prevState) => ({
  //       ...prevState,
  //       start: random,
  //       end: random + 4,
  //     }));
  //     return
  //   }
  //   else if (powerAttack > 0) {
  //     let newActualprogress = actualprogress - degats;
  //     indicator.style.width = `${(newActualprogress * 100)/opponentPvinit}%`;
  //     document.querySelector(
  //       "#progressnum-opponent"
  //     ).innerHTML = `${Math.floor(newActualprogress)} PV`;
     
  //     }
  //       if (actualprogress <= 0) {
  //     indicator.style.width = `${0}%`;
  //     document.querySelector("#progressnum-opponent").innerHTML = `${0} PV`
  //   } 
  // }

  const checkDeath = () => {
    let opponentLife = parseInt(
      document
        .querySelector("#progressnum-opponent")
        .innerHTML.replace("PV", "")
    );
    let playerLife = parseInt(
      document.querySelector("#progressnum").innerHTML.replace("PV", "")
    );
      if(opponentLife <= 0){
        setWinner((prevState) => ({
          ...prevState,
          name: pokemon.name,
          src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
        }))
      }
      else if(playerLife <= 0){
        setWinner((prevState) => ({
          ...prevState,
          name: opponent.name,
          src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${opponent.id}.png`,
        }))
      }
      setLoading(false)
  };

  return (
    <div>
      <h1>Ready to fight</h1>
      
      
      {winner.name === "" ?
      <>
      <div className="lifeBar">
        <div id="pwidget">
          <div id="progressnum">{pokemon && `${pokemon.hp} PV`}</div>
          <div id="progressbar">
            <div id="indicator"></div>
          </div>
        </div>
        <div id="pwidget-opponent">
          <div id="progressnum-opponent">
            {opponent &&
              opponent.stats.map(
                (e, i) => e.stat.name === "hp" && `${e.base_stat} PV`
              )}
          </div>
          <div id="progressbar-opponent">
            <div id="indicator-opponent"></div>
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
                    Promise.all([
                      fetchMoveDetails(e.move.url, e.move.name),
                      confirmAttack(),
                      fetchMoveOpponentDetails(),
                      confirmOpponentAttack(),
                      checkDeath()
                    ]).then((resp) => console.log(resp))
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
          {loading && <button onClick={() => displayAttack()}>Ok?</button>}
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
