import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Atsiprašome</h2>
      <p>Šio puslapio nesuradome.</p>
      <Link to="/">Grįžti į pradinį puslapį</Link>
    </div>
  );
};

export default NotFound;
