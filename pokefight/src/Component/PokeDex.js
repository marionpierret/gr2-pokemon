import Stats from "./Stats";
import { useState, useEffect } from "react";
import axios from "axios";

const PokeDex = (props) => {
console.log(props.name)
  const [details, setDetails] = useState([]);
  const fetchDetails = async () => {
    try {
      const callData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${props.id}`
      );
      setDetails(callData.stats);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

console.log(props)

  return (
    <>
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
            <div
              id="main-screen"
              style={{
                backgroundImage: `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png')`,
              }}
            ></div>
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
            <div className="white-squares-container3">
              {/* <div
                    className="white-square3"
                    onClick={() => count > 1 && setCount(count - 1)}
                  >
                    Previous Pokemon
                  </div>
                  <div
                    className="white-square3"
                    onClick={() => count < 1 && setCount(count + 1)}
                  >
                    Next Pokemon
                  </div> */}
            </div>
          </div>
          <div className="nav-buttons-container">
            <div className="dots-container">
              <div>.</div>
              <div>.</div>
            </div>
            <div className="green-screen">
              <span id="name-screen">{props.name}</span>
            </div>
            <div className="right-nav-container">
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
            {props.stats && props.stats.map((e, i) => (
              <div key={i}>
                <h3>{e.stat.name}:</h3>
                <p>Value : {e.base_stat}</p>
                <p>Effort :{e.effort}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bottom-screens-container">
          <div id="type-screen" className="right-panel-screen">{props.type && props.type.map((e,i)=> i<1 && e.type.name)}</div>
          <div id="id-screen" className="right-panel-screen">
            {`#${props.id}`}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PokeDex;
