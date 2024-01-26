import { useState, useEffect } from "react";
import AddNewForm from "../components/AddNewForm";

const Home = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const getItems = async () => {
    try {
      const response = await fetch("/api/airbnb");
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // form toggle
  const handleAddFormToggle = () => {
    setShowAddForm(!showAddForm);
    setEditedItem(null);
  };

  // add new or edit
  const handleItemAddedOrEdited = async () => {
    setTimeout(() => {
      setShowAddForm(false);
      setEditedItem(null);
    }, 1500);

    getItems();
  };

  // edit button
  const handleEditClick = (item) => {
    setShowAddForm(true);

    setTimeout(() => {
      closeModal();
    }, 100);
  };

  // delete
  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`/api/airbnb/${selectedItem._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      const updatedItems = items.filter(
        (item) => item._id !== selectedItem._id
      );
      setItems(updatedItems);
      setSelectedItem(null);
      setEditedItem(null);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // modals
  const openModal = (item) => {
    setSelectedItem(item);
    setEditedItem(item);
  };
  const closeModal = () => {
    setSelectedItem(null);
  };

  // useEffects
  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (showAddForm && editedItem) {
      window.scrollTo(0, 0);
    }
  }, [showAddForm]);

  return (
    <div className="home">
      <h1 className="title">Airbnb page</h1>

      {selectedItem ? (
        ""
      ) : (
        <button onClick={handleAddFormToggle}>Add New</button>
      )}

      {showAddForm && (
        <AddNewForm
          onItemAddedOrEdited={handleItemAddedOrEdited}
          itemToEdit={editedItem}
        />
      )}

      <div id="homepage">
        <h2>Find place to live!</h2>

        <div id="airbnb-cont">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  openModal(item);
                }}
                className="airbnb-item"
              >
                <div>
                  {item && item.image && <img src={item.image} alt="img" />}
                </div>

                {item && item.name && <h3> {item.name}</h3>}
                {item && item.price && <p>Price: {item.price}</p>}
              </div>
            ))
          ) : (
            <p>No Airbnb. Please add new.</p>
          )}
        </div>
      </div>

      {selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <div className="top">
              <div>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDeleteClick} className="deleteBtn">
                  Delete
                </button>
              </div>

              <span className="close" onClick={closeModal}>
                &times;
              </span>
            </div>

            <div className="img">
              <img src={selectedItem.image} alt="img" />
            </div>

            <h3>{selectedItem.name}</h3>
            <p>{selectedItem.description}</p>
            <p>Bedrooms: {selectedItem.bedrooms}</p>
            <p>Beds: {selectedItem.beds}</p>
            <p>{selectedItem.address}</p>
            <h3>Price: {selectedItem.price}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
