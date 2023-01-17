const Card = (props) => {
  return (
    <div className="pokeCard">
      <td className="organizecardsB">
        <div className="nameimageinfo yellow">
          <table className="nameheaders">
            <tr>
              <td className="basic" colspan="3">
                Basic Pokémon
              </td>
            </tr>
            <tr>
              <td className="nameofanimal">{props.name}</td>
            </tr>
          </table>

          <img
            classNameName="imgCard"
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
