const express = require("express");
const {createPin,getPin, latlongPin} = require("../controllers/pinController");

const router = express.Router();

//create a Pin

router.post("/",createPin );
router.get("/",getPin );
router.get("/destData",latlongPin );

module.exports = router
