const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const createError = require("../utils/createErr");

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const { username, email,phone, password, state } = req.body;
    const hash = await bcrypt.hash(password
        , salt);

    const newUser = new User({
      username,
      email,
      phone,
      state,
      password: hash,
    });

    const user = await newUser.save();

    res.status(200).json(user._id);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    console.log("token", token);

    const { password, ...otherDetails } = user._doc;
    const options = {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({ details: { ...otherDetails }, token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
