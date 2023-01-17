import { Link } from "react-router-dom";
import pokeball from "../Images/pokeball.png"
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate=useNavigate()
  return (
    <>
      {/* <Link to="/" style={{textDecorationLine: 'none', color: 'black'}}> */}
        <img src={pokeball} alt='home' style={{height: '50px'}} onClick={()=>navigate("/")}/>
        {/* </Link> */}
    </>
  );
};

export default NavBar;
