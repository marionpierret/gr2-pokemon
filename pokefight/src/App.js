import './App.css';
import Home from "./Component/Home"
import SelectPokemon from "./Component/SelectPokemon"
import ListByType from "./Component/ListByType"
import { Route, Routes } from 'react-router';
import Select from './Component/Select';
import SelectType from './Component/SelectType';
import NavBar from './Component/NavBar';
import Fight from './Component/Fight';
import {PokemonController} from "./Component/PokemonContext"

const App = () => {
  return (
    <div className="App">
      <PokemonController>
      <NavBar/>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/selectPokemon" element={<Select/>} />
      <Route path="/selectPokemon/byName" element={<SelectPokemon/>} />
      <Route path="/selectPokemon/byType/" element={<SelectType/>} />
      <Route path="/selectPokemon/byType/:type" element={<ListByType/>} />
      <Route path="/fight" element={<Fight/>} />
     </Routes>
     </PokemonController>
    </div>
  );
}

export default App;
