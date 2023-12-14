import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Mano tinklaraštis</h1>
      <div className="links">
        <Link to="/">Pradinis</Link>
        <Link
          to="/create"
          style={{
            color: "white",
            backgroundColor: "#f1356d",
            borderRadius: "8px",
          }}
        >
          Naujas įrašas
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
