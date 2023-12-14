import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function About() {
  const [user, setuser] = useState("Andrius");

  // replace peršoka puslapį iš kurio atsijungei į prieš tai buvusį
  if (!user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="about">
      <h2>Apie mus</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui iusto
        fugit, dolorem ipsam consequuntur dicta ut itaque quo? Necessitatibus
        veniam minus neque veritatis sint illo, ea reprehenderit beatae culpa!
        Exercitationem, voluptatibus facilis ut laudantium omnis voluptas harum
        labore tenetur vero nulla accusantium earum. Harum animi excepturi natus
        delectus ullam voluptas.
      </p>
      <p>
        Velit qui doloremque architecto delectus aliquid, laboriosam praesentium
        repellendus, quas, earum quibusdam vero fugiat culpa. Iure, deserunt
        quaerat error iusto pariatur facilis sed magnam odit, non doloribus unde
        explicabo recusandae nesciunt. Qui consequuntur totam nostrum minus,
        veritatis perferendis, debitis dolorum repudiandae nihil labore dolores
        eligendi ea quod? Nobis, tempore dignissimos!
      </p>
      <p>
        Voluptas explicabo aspernatur odit sapiente ab soluta. Temporibus rem
        hic molestias iste dolores illo id aliquam et nostrum itaque, aperiam
        inventore mollitia expedita voluptates dolor veritatis error saepe
        debitis deleniti porro. Perferendis quibusdam laudantium voluptates aut
        soluta enim deleniti accusamus perspiciatis! Iusto officia iste,
        consequuntur reiciendis voluptas perspiciatis nemo a.
      </p>

      <button onClick={() => setuser(null)}>Atsijungti</button>
    </div>
  );
}
