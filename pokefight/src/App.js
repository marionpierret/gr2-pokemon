import './App.css';
import Home from "./Component/Home"
import SelectType from "./Component/SelectType"
import ListByType from "./Component/ListByType"
import { Route, Routes } from 'react-router';

const App = () => {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/selectPokemon" element={<SelectType/>} />
      <Route path="/selectPokemon/:type" element={<ListByType/>} />
     </Routes>
    </div>
  );
}

export default App;
