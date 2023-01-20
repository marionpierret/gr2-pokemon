import { Link } from "react-router-dom";
import pokeball from "../Images/pokeball.png"
import { useNavigate } from "react-router-dom";
import pokeballReturn from "../Images/pokeballreturn.png"
import '../App.css'

const NavBar = () => {
  const navigate=useNavigate()
  return (
    <div className= "navbar" style={{width:"800px",display : "flex",gap : "20px"}}>
 
      <img src={pokeballReturn} alt='home' style={{height: '50px'}} onClick={()=>navigate("/selectPokemon")}/>
      <img src={pokeball} alt='home' style={{height: '50px'}} onClick={()=>navigate("/")}/>
       

 
    </div>
  );
};

export default NavBar;
