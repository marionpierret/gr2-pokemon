import { useEffect, useState } from "react"
import PokeDex from "./PokeDex"
import SearchBar from "./SearchBar"
import axios from "axios"



const SelectPokemon = () => {
const [query,setQuery] = useState("")
const [data,setData] = useState([])
const [displayDex,setDisplayDex] = useState(false)

const fetchData = async () => {
    try {
        const callData = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${query}`
        );
        setData(callData.data);
        setDisplayDex(true)
      } catch (err) {
        console.log(err);
      }
    };


useEffect(()=>{
    fetchData()
},[query])


    return(<>
        <SearchBar query={query} setQuery={setQuery} setDisplayDex={setDisplayDex}/>
     {displayDex && <PokeDex data={data} query={query} />}
        
    </>)
}

export default SelectPokemon