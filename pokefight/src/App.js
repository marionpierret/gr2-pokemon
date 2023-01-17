import './App.css';
import Home from "./Component/Home"
import SelectPokemon from "./Component/SelectPokemon"
import ListByType from "./Component/ListByType"
import { Route, Routes } from 'react-router';
import Select from './Component/Select';
import SelectType from './Component/SelectType';

const App = () => {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/selectPokemon" element={<Select/>} />
      <Route path="/selectPokemon/byName" element={<SelectPokemon/>} />
      <Route path="/selectPokemon/byType/" element={<SelectType/>} />
      <Route path="/selectPokemon/byType/:type" element={<ListByType/>} />
     </Routes>
    </div>
  );
}

export default App;
