import Dev from "../models/programuotojas.js";

export const prog_get = async (req, res) => {
  const route = req.path;

  if (route === "/programuotojai") {
    try {
      const devs = await Dev.find({}).sort({ createdAt: -1 });
      res.status(200).json(devs);
    } catch (error) {
      console.error("Error fetching devs:", error);
      res.status(500).send(error.message);
    }
  } else {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);

    try {
      const geoResult = await Dev.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [lng, lat],
            },
            distanceField: "distance",
            spherical: true,
            maxDistance: 100000,
          },
        },
      ]);

      res.status(200).json(geoResult);
    } catch (err) {
      console.error("Error in geojson function:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const prog_post = async (req, res) => {
  const { vardas, tech, laisvas, location } = req.body;

  try {
    const dev = await Dev.create({ vardas, tech, laisvas, location });
    res.status(201).json({ dev: dev._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const prog_put = (req, res) => {
  Dev.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((updatedDev) => {
      if (!updatedDev) {
        return res.status(404).json({ error: "Dev not found" });
      }

      res.status(200).json(updatedDev);
    })
    .catch((err) => {
      console.error("Error updating dev:", err);
      res
        .status(500)
        .json({ error: "Error updating dev", details: err.message });
    });
};

export const prog_delete = (req, res) => {
  Dev.findByIdAndDelete({ _id: req.params.id })
    .then((dev) => {
      if (!dev) {
        return res.status(404).json({ error: "Dev not found" });
      }

      res.status(200).json(dev);
    })
    .catch((err) => {
      console.error("Error deleting dev:", err);
      res.status(500).json({ error: "Error deleting dev" });
    });
};
