import NavBar from "./NavBar";
import dresseurHomme from "../Images/dresseurHomme.png";
import dresseurFemme from "../Images/DresseurFemme.png";
import { useState,useContext } from "react";
import { TrainerContext } from "./TrainerContext";
import { useNavigate } from "react-router";

const PersoSelect = () => {
    const navigate=useNavigate()
    const [displayType,setDisplayType] = useState(true)
    const [displayName,setDisplayName] = useState(false)
    const [trainer, setTrainer] = useContext(TrainerContext);

const chooseMale = () => {
    setTrainer((prevState) => ({
        ...prevState,
        name : "",
        picture : "dresseurHomme"}));
        setDisplayName(true);
        setDisplayType(false)
}

const chooseFemale = () => {
    setTrainer((prevState) => ({
        ...prevState,
        name : "",
        picture : "dresseurFemme"}))
        setDisplayName(true);
        setDisplayType(false)
}

const chooseName = (event) => {
    event.preventDefault()
    console.log(event.target)
    setTrainer((prevState) => ({
        ...prevState,
        name : event.target.value,
        }))
}

const reDirect = (event) => {
    event.preventDefault()
    navigate("/selectPokemon")
}


console.log(trainer)

  return (
    <>
      <NavBar />
      <div>
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png"
            height="150%"
            alt="logo"
          />
        </div>
        {displayType &&
        <>
        <div style={{marginTop : "70px"}}>
          <div className="selectTypeBattle">
            <h4>Choose your trainer :</h4>
          </div>
        </div>
        <div style={{display : "flex",justifyContent : "center", gap : "50px"}}>
        <div style={{display : "flex", flexDirection : "column" , justifyContent:"center",alignItems:"center"}} >
          <img src={dresseurHomme} style={{borderRadius : "100px" , height : "200px" , width : "100px"}} alt="dresseurHomme" onClick={()=> chooseMale()}/>
          <h4>Male</h4>
          </div>.
          <div style={{display : "flex", flexDirection : "column" , justifyContent:"center",alignItems:"center"}} >
          <img src={dresseurFemme} style={{borderRadius : "100px" , height : "200px" , width : "100px"}} alt="dresseurFemme" onClick={()=> chooseFemale()}/>
          <h4>Female</h4>
          </div>
        </div> 
        </>
        }
        {displayName &&
        <>
        <div className="selectTypeBattle" style={{marginTop : "70px"}}>
          <h4>Choose the name of your trainer :</h4>
        </div>
        <div style={{display : "flex" , justifyContent : "center"}}>
          <form>
            <label>
              <input type="text" placeholder="Name" onChange={(event) => chooseName(event)}/>
            </label>
            <input className="Send" type="submit" placeholder="Envoyer" onClick={(event) => reDirect(event) } />
          </form>
        </div>
        </>
        }
      </div>
    </>
  );
};

export default PersoSelect;
