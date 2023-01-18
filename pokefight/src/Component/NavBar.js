import { Link } from "react-router-dom";
import pokeball from "../Images/pokeball.png"
import { useNavigate } from "react-router-dom";
import '../App.css'

const NavBar = () => {
  const navigate=useNavigate()
  return (
    <div className= "navbar" style={{width:"800px"}}>
      {/* <Link to="/" style={{textDecorationLine: 'none', color: 'black'}}> */}
        <img src={pokeball} alt='home' style={{height: '50px'}} onClick={()=>navigate("/")}/>
        {/* </Link> */}
    </div>
  );
};

export default NavBar;
