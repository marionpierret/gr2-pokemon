import './App.css';
import Home from "./Component/Home"
import SelectPokemon from "./Component/SelectPokemon"
import ListByType from "./Component/ListByType"
import { Route, Routes } from 'react-router';
import Select from './Component/Select';
import SelectType from './Component/SelectType';
import Fight from './Component/Fight';
import {PokemonController} from "./Component/PokemonContext"
import {RandomController} from "./Component/RandomContext"
import { TrainerController } from './Component/TrainerContext';
import PersoSelect from './Component/PersoSelect';

const App = () => {
  return (
    <div className="App">
      <RandomController>
      <PokemonController>
      <TrainerController>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/selectTrainer" element={<PersoSelect/>} />
      <Route path="/selectPokemon" element={<Select/>} />
      <Route path="/selectPokemon/byName" element={<SelectPokemon/>} />
      <Route path="/selectPokemon/byType/" element={<SelectType/>} />
      <Route path="/selectPokemon/byType/:type" element={<ListByType/>} />
      <Route path="/fight" element={<Fight/>} />
     </Routes>
     </TrainerController>
     </PokemonController>
     </RandomController>
    </div>
  );
}

export default App;
