import { useNavigate } from "react-router"
import './Select.css'
import { RandomContext } from './RandomContext'
import { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import PokeDex from "./PokeDex";


const Select = () => {
    const navigate=useNavigate()
    const [opponent, setOpponent] = useContext(RandomContext) 
    
    const randomNumber = Math.floor(Math.random() * 1010);
    // console.log(randomNumber);
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

    const addOpponent = () => {
      setOpponent((prevState) => ({
        name: random.name,
        id: random.id,
        stats : random.stats
      }))
    }
    
    return(

    <div>
         <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png"
          height="100%"
          alt="logo"
        />
      </div>

      <div className="search-container">
        <button onClick={()=>navigate("/selectPokemon/byName") & addOpponent()}>By Name</button>
        <button onClick={()=>navigate("/selectPokemon/byType") & addOpponent()}>By Type</button>
        
        </div>

      
      <div className="card">
        <div className="align">
          <h4>Your opponent is...</h4>
        </div>
        <div>
          <tr>
          <td><h2>{random.name}</h2></td>
          </tr>
          <tr>
       <td> <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random.id}.png`} width={"150px"} alt="random" /></td>
   
     </tr>
      </div>
      </div> 
</div>



)
}

export default Select