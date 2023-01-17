import { useState, useEffect } from "react";
import axios from "axios";

const Stats = (props) => {
  const [details, setDetails] = useState([]);
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

  useEffect(() => {
    fetchDetails();
  }, []);



  return (
    <>
      {details.map((e, i) => (
        <div key={i}>
          <h3 >{e.stat.name}:</h3>
          <p>Value : {e.base_stat}</p>
          <p>Effort :{e.base_stat}</p>
        </div>
      ))}
    </>
  );
};

export default Stats;
