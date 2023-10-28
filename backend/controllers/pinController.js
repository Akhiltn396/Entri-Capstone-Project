const Pin = require("../models/Pins");

const createPin = async (req, res) => {
  try {
    const {
      username,
      category,
      sim,
      title,
      desc,
      rating,
      lat,
      long,
      location,
    } = req.body;

    const user = new Pin({
      ...req.body,
    });

    const newPin = await user.save();

    res.status(200).json(newPin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPin = async (req, res) => {
  try {
    const { title } = req.query;
    let pins;
    if (title) {
      const sanitizedTitle = title.replace(/"/g, "");
      pins = await Pin.find({
        title: { $regex: sanitizedTitle ? sanitizedTitle : "", $options: "i" },
      });
    } else {
      pins = await Pin.find();
    }

    res.status(200).json(pins);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const latlongPin = (req, res) => {
  // const maxDistance = 1000 / 6371; // Convert 5 kilometers to radians (6371 is the Earth's radius in km)
  const { latitude, longitude } = req.query;

  const radius = 10 / 6371;

  Pin.find({
    "location.coordinates": {
      $geoWithin: {
        $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], radius],
      },
    },
  })

    .then((results) => {
      res.json(results).status(200);

    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500);
    });
};

const deletePin = async (req, res, next) => {
  try {
    await Pin.findByIdAndDelete(req.params.id);

    res.status(200).json("Pin Deleted Successfully");
  } catch (error) {
    next(error);
    console.log(error);

  }
};
module.exports = { createPin, getPin, latlongPin ,deletePin};
