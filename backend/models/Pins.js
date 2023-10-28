const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Petrol Bunk",
        "Restaurant",
        "Hospital",
        "Workshop",
        "Police Station",
        "Tourist Place"
      ],
      default: 'Tourist Place',
    },
    sim: {
      type: String,
      enum: ["Airtel", "Jio", "VI", "BSNL","Network less places are also there"],
      default: 'Network less places are also there',
    },
    title: {
      type: String,
      required: true,
      unique:true
    },
    desc: {
      type: String,
      required: true,
    },

    photos: {
      type: [String],
      required: false,
    },
    weather: {
      type: Number,
    },
    rating: {
      type: Number,
      require: true,
      min: 0,
      max: 5,
    },

    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        default: "Point", // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Pin = mongoose.model("Pin", PinSchema);
module.exports = Pin;
