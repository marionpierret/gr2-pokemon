import { Link, useLocation } from "react-router-dom";
import pokeball from "../Images/pokeball.png"
import { useNavigate } from "react-router-dom";
import { TrainerContext } from "./TrainerContext";
import { useContext,useState } from "react";
import '../App.css'
import DresseurHomme from "../Images/IcondresseurHomme-removebg-preview.png"
import DresseurFemme from "../Images/IconDresseurFemme-removebg-preview.png"


const NavBar = () => {
  const selectTrainer = useLocation()
  console.log(selectTrainer.pathname)
  const navigate=useNavigate()
  const [trainer, setTrainer] = useContext(TrainerContext);
  console.log(trainer)
  return (
    <div className= "navbar" style={{width:"800px", display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
      {/* <Link to="/" style={{textDecorationLine: 'none', color: 'black'}}> */}
        <div>
        <img src={pokeball} alt='home' style={{height: '50px'}} onClick={()=>navigate("/")}/>
        </div>
        {selectTrainer.pathname !== "/selectTrainer" && trainer.picture === "dresseurHomme" && trainer.name !== "" &&
        <div style={{display : "flex", flexDirection:"column" ,justifyContent:"center",alignItems:"center" ,margin:"0px"}}>
        <img src={DresseurHomme} width="70px" alt="dresseurHomme"/>
        <p style={{fontSize : "10px"}}>{trainer.name}</p>
        </div>
        }
        {selectTrainer.pathname !== "/selectTrainer" && trainer.picture === "dresseurFemme" && trainer.name !== "" &&
        <div style={{display : "flex", flexDirection:"column" ,justifyContent:"center",alignItems:"center" ,margin:"0px"}}>
        <img src={DresseurFemme} width="50px" alt="dresseurFemme"/>
        <p style={{fontSize : "10px"}}>{trainer.name}</p>
        </div>
        }
        {/* </Link> */}
    </div>
  );
};

export default NavBar;
