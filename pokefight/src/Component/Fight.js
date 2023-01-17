import { useContext,useState,useEffect } from "react";
import { PokemonContext } from "./PokemonContext";
import { RandomContext } from './RandomContext'
import axios from "axios";

const Fight = () => {
    const [pokemon, setPokemon] = useContext(PokemonContext) 
    const [opponent, setOpponent] = useContext(RandomContext) 
    const [movePlayer, setMovePlayer] = useState([])
    const [moveOpponent, setMoveOpponent] = useState([])
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

    console.log(movePlayer)
    return(
        <div>
            <h1>Ready to fight</h1>
            <div className="arene">
            <div className="movePlayer">
            {movePlayer.slice(0,4).map((e,i)=> 
            <p>{e.move.name}</p>)}
            </div>

            <div className="arene">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokemon.id}.png`} width={"150px"} alt="pokemonBack" />
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${opponent.id}.png`} width={"150px"} alt="pokemonBack" />
            </div>
            <div className="moveOpponent">
            {moveOpponent.slice(0,4).map((e,i)=> 
            <p>{e.move.name}</p>)}
            </div>

            </div>
        </div>
    )
}

export default Fight