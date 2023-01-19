import { useEffect, useState } from "react";
import axios from "axios";
import Stats from "./Stats";
import NavBar from './NavBar'
import NavBarSelect from "./NavBarSelect"

const SearchBar = (props) => {
  const inputField = document.getElementById("name-input"); // search field input

  const [input, setInput] = useState([]);
  const [result, setResult] = useState([]);

  const getPokemonData = (pokemon) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      });
  };

  return (
    <>
    <NavBarSelect/>
      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png"
          height="150%"
          alt="logo"
          style={{marginBottom: '50px'}}
        />
      </div>

      <div className="search-container">
        <input
          id="name-input"
          type="text"
          placeholder="Search by Name / id"
          onChange={(e) => setInput(e.target.value)}
        />

        <div
          id="search-btn"
          className="ball-container"
          onClick={() => props.setQuery(input.toLowerCase())}
        >
          <div className="upper-half-ball"></div>
          <div className="bottom-half-ball"></div>
          <div className="center-ball"></div>
          <div className="center-line"></div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
