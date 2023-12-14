import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <h2>Puslapis nerastas</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        quaerat dolorum libero totam provident officia ex et officiis, corporis
        recusandae at culpa. Molestias quas eos, inventore mollitia esse saepe
        deleniti.
      </p>
      Grįžti į <Link to="/"> pradinį puslapį</Link>.
    </div>
  );
}
