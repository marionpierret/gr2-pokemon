import Footer from "./Footer";
import { Link } from "react-router-dom";
import "./Home.css";
import pokemonHome from "../Images/pokemonHome.png";
import startTheGame from "../Images/startTheGame.png";
import rules from "../Images/rules.png"

const Home = () => {
  return (
    <div className="home">
      <div className="logo">
        {" "}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png"
          alt="logo"
          style={{ height: "200px" }}
        />
      </div>
      <div className='centerhome'>
      <div className="card">
        <div className="align">
          <img src={rules} alt="rules" style={{ height: "70px" }} />
        </div>
        <p>
          Pick your pokemon and start the battle!
        </p>
      </div> 
      <Link to="/selectPokemon" className="start">
        <img
          src={startTheGame}
          className="image-clignote"
          alt="startthegame"
          style={{ height: "70px" }}
        />
      </Link>
</div>
     
      <div className='pokemonImg'>
      <img src={pokemonHome} alt="pokemonHome" style={{ height: "400px" }}/>
      </div>
      <Footer/>
    </div>

  );
};

export default Home;
