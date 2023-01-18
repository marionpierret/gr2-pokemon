import Footer from "./Footer";
import { Link } from "react-router-dom";
import "./Home.css";
import pokemonHome from "../Images/pokemonHome.png";
import startTheGame from "../Images/startTheGame.png";
import rules from "../Images/rules.png";
import { useNavigate } from "react-router-dom";
import NavBarHome from "./NavBarHome";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <NavBarHome />

      <div className="logo">
        {" "}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png"
          alt="logo"
          style={{ height: "200px" }}
        />
      </div>
      <div className="centerhome">
        <div className="card">
          <div className="align">
            <img src={rules} alt="rules" style={{ height: "70px" }} />
          </div>
          <p>
            Pick your pokemon and play battles with randomly generated
            contestants!
          </p>
        </div>
        <div className="start">
          <img
            src={startTheGame}
            className="image-clignote"
            alt="startthegame"
            style={{ height: "70px" }}
            onClick={() => navigate("/selectPokemon")}
          />
        </div>
       

      <div className="footer">
        <Footer />
        </div>
      </div>

       
    </div>
  );
};

export default Home;
