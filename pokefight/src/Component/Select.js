import { useNavigate } from "react-router"


const Select = () => {
    const navigate=useNavigate()
    return(<>
         <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png"
          height="100%"
          alt="logo"
        />
      </div>

      <div className="search-container">
        <button onClick={()=>navigate("/selectPokemon/byName")}>By Name</button>
        <button onClick={()=>navigate("/selectPokemon/byType")}>By Type</button>
        
        </div>
    </>)
}

export default Select