import { useState } from "react";

const AddNewForm = ({ onDevAdded }) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //get values
    const vardas = e.target.vardas.value;
    const tech = e.target.tech.value;
    const laisvas = e.target.laisvas.value;
    const location = {
      coordinates: [
        parseFloat(e.target.lng.value),
        parseFloat(e.target.lat.value),
      ],
    };

    try {
      const res = await fetch("/api/programuotojai", {
        method: "POST",
        body: JSON.stringify({ vardas, tech, laisvas, location }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        await res.json();
        setSuccessMessageVisible(true);

        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
        onDevAdded();
        e.target.reset();
      } else {
        console.error("Nepavyko pridėti.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addNew">
      <form onSubmit={handleSubmit}>
        <h2>Naujo programuotojo pridėjimas:</h2>
        <div>
          <label htmlFor="vardas">Vardas</label>
          <input type="text" name="vardas" id="vardas" required />
        </div>
        <div className="name error"></div>
        <div>
          <label htmlFor="tech">Naudojamos technologijos:</label>
          <input type="text" name="tech" id="tech" required />
        </div>
        <div className="tech error"></div>
        <div>
          <label> Laisvas:</label>

          <label>
            <input type="radio" name="laisvas" id="laisvasTrue" value="true" />
            Taip
          </label>

          <label>
            <input
              type="radio"
              name="laisvas"
              id="laisvasFalse"
              value="false"
              defaultChecked
            />
            Ne
          </label>
        </div>
        <div className="laisvas error"></div>
        <div>
          <h3>Koordinatės:</h3>
          <div>
            <label htmlFor="lng">Ilguma:</label>
            <input type="number" name="location" step="any" id="lng" required />
            <label htmlFor="lat">Platuma:</label>
            <input type="number" name="location" step="any" id="lat" required />
          </div>
        </div>
        <div className="location error"></div>
        <input type="submit" value="Įkelti" />
      </form>
      <div
        id="successMessage"
        style={{ display: successMessageVisible ? "block" : "none" }}
      >
        Vartotojas sukurtas sėkmingai!
      </div>
    </div>
  );
};

export default AddNewForm;
