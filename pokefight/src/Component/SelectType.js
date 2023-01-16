import {useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
import axios from 'axios'

const SelectType = () => {

const navigate=useNavigate()
const [species,setSpecies] = useState([])

const fetchData = async () => {
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
    fetchData()
},[])


    return (<>
    {species.map((e,i)=>
    <button key={i} onClick={() => navigate(`/selectPokemon/${e.name}`)}>{e.name}</button>
    )}
    </>)
}

export default SelectType
