const express = require("express");
const {createPin,getPin} = require("../controllers/pinController");

const router = express.Router();

//create a Pin

router.post("/",createPin );
router.get("/",getPin );

module.exports = router
