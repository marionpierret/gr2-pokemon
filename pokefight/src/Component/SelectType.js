import {useState,useEffect} from "react"
import axios from 'axios'
import { useNavigate } from "react-router"
import Card from "./Card"
import NavBarSelect from "./NavBarSelect"


const SelectType = (props) => {

const navigate=useNavigate()
const [species,setSpecies] = useState([])


const fetchPokemonType = async (type) => {
    try {
      const callData = await axios.get(
        `https://pokeapi.co/api/v2/type/`
      );
      setSpecies(callData.data.results);

    } catch (err) {
      console.log(err);
    }
  };

useEffect(()=>{
  fetchPokemonType()
},[])

    return (<>
    <NavBarSelect/>
        <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png"
          height="150%"
          alt="logo"
        />
      </div>
    <div className="displayType">
      <div className="selectType">
    <h4>Select by Type </h4>
    </div>
      <div className="white-squares-container2">
        {species.map(
          (e, i) =>
            e.name !== "unknown" && e.name !== "shadow" && (
              <div
                key={i}
                className="white-square2"
                onClick={() => navigate(`/selectPokemon/byType/${e.name}`)}
              >
                {e.name}
              </div>
            )
        )}
        </div>
    </div>
    </>)
}

export default SelectType
