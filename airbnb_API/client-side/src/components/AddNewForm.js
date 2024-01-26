import React, { useState, useEffect } from "react";

const AddNewForm = ({ onItemAddedOrEdited, itemToEdit }) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    bedrooms: 0,
    beds: 0,
    address: "",
    image: "",
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData({ ...itemToEdit });
    }
  }, [itemToEdit, isSubmitting]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch(
        itemToEdit ? `/api/airbnb/${itemToEdit._id}` : "/api/airbnb",
        {
          method: itemToEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(
          itemToEdit ? "Failed to update item" : "Failed to add new item"
        );
      }

      if (response.ok) {
        const newItem = await response.json();
        onItemAddedOrEdited(newItem.airbnb);
        setSuccessMessageVisible(true);
        setFormData({
          name: "",
          description: "",
          price: 0,
          bedrooms: 0,
          beds: 0,
          address: "",
          image: "",
        });
        setTimeout(() => {
          setSuccessMessageVisible(false);
          setIsSubmitting(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addNew">
      <form onSubmit={handleSubmit}>
        <h2>{itemToEdit ? "Edit Airbnb:" : "New Airbnb:"}</h2>

        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="bedrooms">Bedrooms:</label>
          <input
            type="number"
            name="bedrooms"
            id="bedrooms"
            value={formData.bedrooms}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="beds">Beds:</label>
          <input
            type="number"
            name="beds"
            id="beds"
            value={formData.beds}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Image url:</label>
          <input
            type="text"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleInputChange}
            required
          />
        </div>

        <input type="submit" value={itemToEdit ? "Save" : "Add"} />
      </form>

      <div
        id="successMessage"
        style={{ display: successMessageVisible ? "block" : "none" }}
      >
        {itemToEdit
          ? "Airbnb updated successfully!"
          : "Airbnb added successfully!"}
      </div>
    </div>
  );
};

export default AddNewForm;
