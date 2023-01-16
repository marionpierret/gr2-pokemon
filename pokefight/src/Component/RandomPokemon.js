import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const RandomPokemon = () => {
  const searchBtn = document.getElementById("search-btn"); // search button
  const inputField = document.getElementById("name-input"); // search field input
  const nameScreen = document.getElementById("name-screen"); //name-screen
  const imageScreen = document.getElementById("main-screen"); // image screen
  const aboutScreen = document.getElementById("about-screen"); // about-text screen
  const typeScreen = document.getElementById("type-screen"); // type screen
  const idScreen = document.getElementById("id-screen"); // spices screen

  const randomNumber = Math.floor(Math.random() * 1010);
  console.log(randomNumber);

  const [random, setRandom] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRandomPokemon = async () => {
    try {
      const callPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomNumber}/`
      );
      setRandom(callPokemon.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  console.log(random);

  return (
    <div>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="title">{random.name}</p>
            {loading && (
              <img src={`${random.sprites.front_default}`} alt="logoPokemon" />
            )}
          </div>
          <div className="flip-card-back">
            <p className="title">Stats</p>
            <div>
              {/* <Stats
                id={e.pokemon.url
                  .substr(34, e.pokemon.url.length)
                  .replace("/", "")}
              /> */}
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {details.map((e, i) => (
                  <div key={i} style={{ border: "1px solid black" }}>
                    <h5>{e.stat.name} :</h5>
                    <p>Value : {e.base_stat}</p>
                    <p>Effort :{e.base_stat}</p>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png"
          height="100%"
          alt="logo"
        />
      </div>

      <div id="pokedex">
        <div id="left-panel">
          <div className="left-top-container">
            <svg style={{ height: "100", width: "225" }} className="left-svg">
              <polyline
                points="0,75 70,75 90,38 224,38"
                style={{ fill: "none", stroke: "black", strokeWidth: 3 }}
              />
            </svg>
            <div className="lights-container">
              <div className="big-light-boarder">
                <div className="big-light blue">
                  <div className="big-dot light-blue"></div>
                </div>
              </div>
              <div className="small-lights-container">
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
                <div className="small-light yellow">
                  <div className="dot light-yellow"></div>
                </div>
                <div className="small-light green">
                  <div className="dot light-green"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="screen-container">
            <div className="screen">
              <div className="top-screen-lights">
                <div className="mini-light red"></div>
                <div className="mini-light red"></div>
              </div>
              <div>
                {loading && (
                  <img
                    src={`${random.sprites.front_default}`}
                    alt="logoPokemon"
                  />
                )}
              </div>
              <div className="bottom-screen-lights">
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
                <div className="burger">
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="buttons-container">
            <div className="upper-buttons-container">
              <div className="big-button"></div>
              <div className="long-buttons-container">
                <div className="long-button red"></div>
                <div className="long-button light-blue"></div>
              </div>
            </div>
            <div className="nav-buttons-container">
              <div className="dots-container">
                <div>.</div>
                <div>.</div>
              </div>
              <div className="green-screen">
                <span id="name-screen">{random.name}</span>
              </div>
              <div className="right-nav-container">
                <div className="nav-button">
                  <div className="nav-center-circle"></div>
                  <div className="nav-button-vertical"></div>
                  <div className="nav-button-horizontal">
                    <div className="border-top"></div>
                    <div className="border-bottom"></div>
                  </div>
                </div>
                <div className="bottom-right-nav-container">
                  <div className="small-light red">
                    <div className="dot light-red"></div>
                  </div>
                  <div className="dots-container">
                    <div className="black-dot">.</div>
                    <div className="black-dot">.</div>
                    <div className="black-dot">.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="right-panel">
          <div className="empty-container">
            <svg height="100%" width="100%">
              <polyline
                points="0,0 0,40 138,40 158,75 250,75 250,0 0,0"
                style={{ fill: "#f2f2f2", stroke: "none", strokeWidth: 3 }}
              />
              <polyline
                points="0,40 138,40 158,75 250,75"
                style={{ fill: "none", stroke: "black", strokeWidth: 3 }}
              />
            </svg>
          </div>

          <div className="top-screen-container">
            <div id="about-screen" className="right-panel-screen">
              {/* Height: 70cm Weight: 6.9kg */}
              {loading &&
                random.stats.map((e, i) => {
                return(
                    <div key={i}>
                    <p>{e.stat.name}</p>
                    <p>{e.base_stat}</p>
                    <p>{e.effort}</p>
                    </div>
                )
              })}
            </div>
          </div>

          {/* <div className="square-buttons-container">
            <div className="blue-squares-container">
              <div className="blue-square"></div>
              <div className="blue-square"></div>
              <div className="blue-square"></div>
              <div className="blue-square"></div>
              <div className="blue-square"></div>
              <div className="blue-square"></div>
              <div className="blue-square"></div>
              <div className="blue-square"></div>
              <div className="blue-square"></div>
              <div className="blue-square"></div>
            </div>
          </div> */}

          {/* <div className="center-buttons-container">
            <div className="center-left-container">
              <div className="small-reds-container">
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
              </div>
              <div className="white-squares-container">
                <div className="white-square"></div>
                <div className="white-square"></div>
              </div>
            </div>
            <div className="center-right-container">
              <div className="thin-buttons-container">
                <div className="thin-button"></div>
                <div className="thin-button"></div>
              </div>
              <div className="yellow-button yellow">
                <div className="big-dot light-yellow"></div>
              </div>
            </div>
          </div> */}

          <div className="bottom-screens-container">
            <div id="type-screen" className="right-panel-screen">
              {loading && random.types ? (
                random.types.map((e, i) => {
                    return(
                        <div key={i}>
                        {e.type.name}
                        </div>
                        )
                })
              ) : (
                <p>type unknown</p>
              )}
            </div>
            <div id="id-screen" className="right-panel-screen">
              #1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomPokemon;
