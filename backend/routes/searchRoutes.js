const express = require("express");
const { search } = require("../controllers/searchController");
// const {createPin,getPin} = require("../controllers/pinController");

const router = express.Router();

//create a Pin

router.post("/",search );
router.get("/" );

module.exports = router
