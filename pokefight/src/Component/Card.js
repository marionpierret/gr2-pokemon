const Card = (props) => {

  const className = () => {
    
    if (props.type === "fire") {
      return "nameimageinfo redorange";
    } else if (props.type === "electric") {
      return "yellow";
    } else if (props.type === "water") {
      return "blue";
    } else if (props.type === "grass") {
      return "green";
    } else if (props.type === "electric") {
      return "test";
    } else if (props.type === "normal") {
      return "normal";
    } else if (props.type === "fighting") {
      return "fighting";
    } else if (props.type === "flying") {
      return "flying";
    } else if (props.type === "poison") {
      return "pioson";
    } else if (props.type === "ground") {
      return "ground";
    } else if (props.type === "rock") {
      return "rock";
    } else if (props.type === "bug") {
      return "bug";
    } else if (props.type === "ghost") {
      return "ghost";
    } else if (props.type === "steel") {
      return "steel";
    } else if (props.type === "psychic") {
      return "psychic";
    } else if (props.type === "ice") {
      return "ice";
    } else if (props.type === "dragon") {
      return "dragon";
    } else if (props.type === "dark") {
      return "dark";
    } else if (props.type === "fairy") {
      return "fairy";
    } else if (props.type === "shadow") {
      return "shadow";
    } 
  }

  return (
    <div className="pokeCard">
      <td className="organizecardsB">
        <div className={props.type && className()}>
          <table className="nameheaders">
            <tr>
              <td className="basic" colSpan="3">
                Basic Pokémon
              </td>
            </tr>
            <tr>
              <td className="nameofanimal">{props.name}</td>
            </tr>
          </table>

          <img
            className="imgCard"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
            width={"150px"}
            alt="PokemonPicture"
          />

          <div className="infoonly">
            <p className="description">Click here to see PokeDex stats</p>
          </div>
        </div>
      </td>
    </div>
  );
};

export default Card;
