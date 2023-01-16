import {useParams} from "react-router-dom"
import {useState,useEffect} from "react"
import axios from 'axios'

const ListByType = () => {

    const {type} = useParams()
    const [listByType,setListByType] = useState([])
    console.log(type)
    const fetchData = async () => {
        try {
          const callData = await axios.get(
            `https://pokeapi.co/api/v2/type/${type}`
          );
          setListByType(callData.data.pokemon);
    
        } catch (err) {
          console.log(err);
        }
      };


    const fetchDetails = async (e) => {
        try {
          const callData = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${e}`
          );
          setListByType(callData.data.pokemon);
    
        } catch (err) {
          console.log(err);
        }
      }; 
    
    useEffect(()=>{
        fetchData()
    },[])
    

console.log(listByType)

    return (<>
    {listByType.map((e,i) =>
    <div key={i} className="flip-card">
    <div className="flip-card-inner">
        <div className="flip-card-front">
            <p className="title">{e.pokemon.name}</p>
            <p><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.pokemon.url.substr(34, e.pokemon.url.length).replace("/","")}.png`} alt="logoPokemon"/>
                
                {console.log(e.pokemon.url.substr(34, e.pokemon.url.length).replace("/",""))}</p>
        </div>
        <div className="flip-card-back">
            <p className="title">BACK</p>
            <p>Leave Me</p>
        </div>
    </div>
</div>
    )}
    </>)
}

export default ListByType