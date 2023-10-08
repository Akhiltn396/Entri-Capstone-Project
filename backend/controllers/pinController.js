const Pin = require("../models/Pins");

const createPin = async (req, res) => {
  try {
    const { username, title, desc, rating, lat, long } = req.body;

    const user = new Pin({
      username,
      title,
      desc,
      rating,
      lat,
      long,
    });

    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPin = async (req,res) =>{

    try {
        const pins = await Pin.find()

        res.status(200).json(pins)
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports = {createPin,getPin};
