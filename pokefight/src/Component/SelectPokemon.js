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
  
      } catch (err) {
        console.log(err);
      }
    };


useEffect(()=>{
    fetchData()
},[query])

console.log(data)
    return(<>
        <SearchBar query={query} setQuery={setQuery} setDisplayDex={setDisplayDex}/>
     {data.length>0 && <PokeDex data={data.data} query={query} type={data.types}/>}
        
    </>)
}

export default SelectPokemon