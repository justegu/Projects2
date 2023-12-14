import { useState } from "react";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [autorius, setAutorius] = useState("Andrius");

  const handleSubmit = (e) => {
    e.preventDefault();

    const blog = { title, body, autorius };

    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      window.history.back(); //sugražina į pagrindinį psl
    });
  };

  return (
    <div className="create">
      <h2>Naujas įrašas</h2>
      <form onSubmit={handleSubmit}>
        <label>Įrašo pavadinimas:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Įrašo tekstas:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Įrašo autorius:</label>
        <select value={autorius} onChange={(e) => setAutorius(e.target.value)}>
          <option value="Andrius">Andrius</option>
          <option value="Valdemaras">Valdemaras</option>
          <option value="Dovilė">Dovilė</option>
        </select>
        <button>Pridėti įrašą</button>
      </form>
    </div>
  );
};

export default Create;
