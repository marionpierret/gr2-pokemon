import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Link to="/" style={{textDecorationLine: 'none', color: 'black'}}>Home</Link>
    </>
  );
};

export default NavBar;
