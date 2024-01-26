import Item from "../models/item.js";

export const item_get = async (req, res) => {
  try {
    const airbnb = await Item.find({}).sort({ createdAt: -1 });
    res.status(200).json(airbnb);
  } catch (error) {
    console.error("Error fetching airbnb:", error);
    res.status(500).send(error.message);
  }
};

export const item_post = async (req, res) => {
  const { name, description, bedrooms, beds, price, address, image } = req.body;

  try {
    const airbnb = await Item.create({
      name,
      description,
      bedrooms,
      beds,
      price,
      address,
      image,
    });
    res.status(201).json({ airbnb: airbnb._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const item_put = (req, res) => {
  const { name, description, bedrooms, beds, price, address, image } = req.body;

  Item.findByIdAndUpdate(
    { _id: req.params.id },
    { name, description, bedrooms, beds, price, address, image },
    { new: true }
  )
    .then((updatedItem) => {
      if (!updatedItem) {
        return res.status(404).json({ error: "Airbnb not found" });
      }

      res.status(200).json(updatedItem);
    })
    .catch((err) => {
      console.error("Error updating Airbnb:", err);
      res
        .status(500)
        .json({ error: "Error updating Airbnb", details: err.message });
    });
};

export const item_delete = (req, res) => {
  Item.findByIdAndDelete({ _id: req.params.id })
    .then((airbnb) => {
      if (!airbnb) {
        return res.status(404).json({ error: "Airbnb not found" });
      }

      res.status(200).json(airbnb);
    })
    .catch((err) => {
      console.error("Error deleting Airbnb:", err);
      res.status(500).json({ error: "Error deleting Airbnb" });
    });
};
