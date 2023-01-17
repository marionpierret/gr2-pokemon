const Card = (props) => {

  const className = () => {
    
    if (props.type === "fire") {
      return "nameimageinfo redorange";
    } else if (props.type === "electric") {
      return "nameimageinfo yellow";
    } else if (props.type === "water") {
      return "nameimageinfo blue";
    } else if (props.type === "grass") {
      return "nameimageinfo green";
    } else if (props.type === "normal") {
      return "nameimageinfo normal";
    } else if (props.type === "fighting") {
      return "nameimageinfo fighting";
    } else if (props.type === "flying") {
      return "nameimageinfo flying";
    } else if (props.type === "poison") {
      return "nameimageinfo poison";
    } else if (props.type === "ground") {
      return "nameimageinfo ground";
    } else if (props.type === "rock") {
      return "nameimageinfo rock";
    } else if (props.type === "bug") {
      return "nameimageinfo bug";
    } else if (props.type === "ghost") {
      return "nameimageinfo ghost";
    } else if (props.type === "steel") {
      return "nameimageinfo steel";
    } else if (props.type === "psychic") {
      return "nameimageinfo psychic";
    } else if (props.type === "ice") {
      return "nameimageinfo ice";
    } else if (props.type === "dragon") {
      return "nameimageinfo dragon";
    } else if (props.type === "dark") {
      return "nameimageinfo dark";
    } else if (props.type === "fairy") {
      return "nameimageinfo fairy";
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
