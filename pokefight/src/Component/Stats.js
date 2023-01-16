import {useState,useEffect} from "react"
import axios from "axios"

const Stats = (props) => {

    const [details,setDetails] = useState([])
    const fetchDetails = async () => {
        try {
          const callData = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${props.id}`
          );
          setDetails(callData.data.stats);
    
        } catch (err) {
          console.log(err);
        }
      }; 

        useEffect(()=>{
            fetchDetails()
    },[])

    console.log(details)

    return(
            <div style={{display : "flex" , flexDirection : "row" , flexWrap : "wrap", justifyContent : "center"}}>
            {details.map((e,i)=> 
            <div key={i} style={{border : "1px solid black"}}>
            <h5>{e.stat.name} :</h5>
            <p>Value : {e.base_stat}</p>
            <p>Effort :{e.base_stat}</p>
            </div>
            )}
            </div>
        )
}

export default Stats