const express = require("express");
const {
  createPin,
  getPin,
  latlongPin,
  deletePin,
} = require("../controllers/pinController");

const router = express.Router();

//create a Pin

router.post("/", createPin);
router.get("/", getPin);
router.get("/destData", latlongPin);
router.delete("/:id", deletePin);

module.exports = router;
