import React, { useEffect, useState } from "react";
import AddNewForm from "../components/AddNewForm";
import Devs from "../components/fetchData";

const Database = () => {
  const [devs, setDevs] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  const fetchData = async () => {
    try {
      const data = await new Devs().fetchDevs();
      setDevs(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDevAdded = async () => {
    await fetchData();

    setTimeout(() => {
      setFormVisible(false);
    }, 3000);
  };

  const handleDevDelete = async (devId) => {
    try {
      const res = await fetch(`/api/programuotojai/${devId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDevs((prevDevs) => prevDevs.filter((dev) => dev._id !== devId));
      } else {
        console.error(`Failed to delete dev with ID ${devId}.`);
      }
    } catch (error) {
      console.error("Error deleting dev:", error);
    }
  };

  const handleEditClick = (devId) => {
    setDevs((prevDevs) =>
      prevDevs.map((dev) =>
        dev._id === devId ? { ...dev, isEditing: true } : dev
      )
    );
  };

  const handleSaveClick = async (devId, index) => {
    const devToUpdate = devs[index];

    const updatedData = {
      laisvas: devToUpdate.laisvas,
      vardas: devToUpdate.vardas,
      tech: devToUpdate.tech,
      location: {
        type: "Point",
        coordinates: [
          Math.min(
            Math.max(parseFloat(devToUpdate.location.coordinates[0]), -180),
            180
          ),
          Math.min(
            Math.max(parseFloat(devToUpdate.location.coordinates[1]), -90),
            90
          ),
        ],
      },
    };

    try {
      const res = await fetch(`/api/programuotojai/${devId}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setDevs((prevDevs) =>
          prevDevs.map((dev) =>
            dev._id === devId ? { ...dev, isEditing: false } : dev
          )
        );
      } else {
        console.error("Nepavyko atnaujinti.");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const toggleContent = (index) => {
    const updatedDevs = [...devs];
    updatedDevs[index].laisvas = !updatedDevs[index].laisvas;
    setDevs(updatedDevs);
  };

  const handleFieldBlur = (e, field, index) => {
    const updatedDevs = [...devs];

    if (field.startsWith("coordinates")) {
      const coordinates = [...updatedDevs[index].location.coordinates];
      const coordIndex = field === "coordinates[0]" ? 0 : 1;
      coordinates[coordIndex] = parseFloat(e.target.textContent.trim()) || 0;

      updatedDevs[index].location.coordinates = coordinates;
    } else {
      updatedDevs[index][field] = e.target.textContent.trim();
    }

    setDevs(updatedDevs);
  };

  return (
    <div>
      <h1 className="title">Duomenų bazė</h1>
      <button id="createNew" onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? "Slėpti formą" : "Pridėti naują"}
      </button>
      {formVisible && <AddNewForm onDevAdded={handleDevAdded} />}
      <div className="database">
        <div id="devs-parent">
          <h2>Visi programuotojai</h2>
          <div id="devs">
            {devs && devs.length > 0 ? (
              <ul>
                {devs.map((dev, index) => (
                  <li key={dev._id} data-id={dev._id}>
                    {dev.isEditing ? (
                      <>
                        <div className="allSpans">
                          <span
                            className={dev.laisvas ? "true" : "false"}
                          ></span>
                          <span onClick={() => toggleContent(index)}>
                            {dev.laisvas ? "Ieško darbo" : "Neieško darbo"}
                          </span>
                          <span
                            className="name"
                            contentEditable={true}
                            onBlur={(e) => handleFieldBlur(e, "vardas", index)}
                            suppressContentEditableWarning={true}
                          >
                            {dev.vardas}
                          </span>

                          <span
                            className="rank"
                            contentEditable={true}
                            onBlur={(e) => handleFieldBlur(e, "tech", index)}
                            suppressContentEditableWarning={true}
                          >
                            {dev.tech}
                          </span>

                          <div className="coords-div">
                            <span
                              className="dist"
                              contentEditable={true}
                              onBlur={(e) =>
                                handleFieldBlur(e, "coordinates[0]", index)
                              }
                              suppressContentEditableWarning={true}
                            >
                              {dev.location && dev.location.coordinates
                                ? dev.location.coordinates[0]
                                : "N/A"}
                            </span>
                            ,
                            <span
                              className="dist"
                              contentEditable={true}
                              onBlur={(e) =>
                                handleFieldBlur(e, "coordinates[1]", index)
                              }
                              suppressContentEditableWarning={true}
                            >
                              {dev.location && dev.location.coordinates
                                ? dev.location.coordinates[1]
                                : "N/A"}
                            </span>
                          </div>
                        </div>

                        <div>
                          <button
                            className="saveBtn"
                            onClick={() => handleSaveClick(dev._id, index)}
                          >
                            Save
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="allSpans">
                          <span
                            className={dev.laisvas ? "true" : "false"}
                          ></span>
                          <span>
                            {dev.laisvas ? "Ieško darbo" : "Neieško darbo"}
                          </span>
                          <span className="name">{dev.vardas}</span>
                          <span className="rank">{dev.tech}</span>

                          <div className="coords-div">
                            <span className="dist">
                              {dev.location && dev.location.coordinates
                                ? dev.location.coordinates[0]
                                : "N/A"}
                            </span>
                            ,
                            <span className="dist">
                              {dev.location && dev.location.coordinates
                                ? dev.location.coordinates[1]
                                : "N/A"}
                            </span>
                          </div>
                        </div>

                        <div>
                          <button
                            className="editBtn"
                            onClick={() => handleEditClick(dev._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="deleteBtn"
                            onClick={() => handleDevDelete(dev._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No developers found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Database;
