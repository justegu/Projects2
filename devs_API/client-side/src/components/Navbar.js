import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h2>Paieška</h2>
        </Link>
        <Link to="/api/programuotojai">
          <h2>Duombazė</h2>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
