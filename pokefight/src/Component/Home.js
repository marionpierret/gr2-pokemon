import {Link} from "react-router-dom"
import RandomPokemon from "./RandomPokemon"


const Home = () => {
    return(<div className="home">
    <div className="homeNavBar">
    <img src="" alt="homeLogo"/>
    <Link to="/selectPokemon">Choose your fighter</Link>
    </div>
    <div>
        <h1>The Pokefight</h1>
    </div>
    <RandomPokemon />
    
    </div>)
}

export default Home