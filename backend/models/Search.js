const mongoose = require("mongoose");

const SearchSchema = new mongoose.Schema(
  {
    place: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },

  },
  { timestamps: true }
);

const Search = mongoose.model("Search", SearchSchema);
module.exports = Search;
