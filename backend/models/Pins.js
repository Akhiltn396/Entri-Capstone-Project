const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum:['Petrol Bunk','Restaurant','Hospital','Workshop','Police Station']
    },
    sim:{
      type:String,
      enum:['Airtel','Jio','VI','BSNL']
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    internet:{
    type:String,
    enum:['Airtel','Jio','VI','BSNL']
    },
    weather:{
      type:Number
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
        default: 'Point', // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  { timestamps: true }
);

const Pin = mongoose.model("Pin", PinSchema);
module.exports = Pin;
