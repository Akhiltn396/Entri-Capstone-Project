const Search = require("../models/Search");

const search = async (req, res) => {
    try {
      const { place,latitude,longitude } = req.body;

      const search = new Search({
       place,
       latitude,
       longitude
      });

      const newSearch = await search.save();
      res.status(200).json(newSearch);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  module.exports = {search};
