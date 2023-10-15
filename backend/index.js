const express = require("express");
const cookieParser = require("cookie-parser");

const db = require("./config/dbConnect");
const authRoute = require("./routes/authRoutes");
const pinRoute = require("./routes/pinRoutes");
const  searchRoute  = require("./routes/searchRoutes")
// const  roomRoute  = require("./routes/rooms")
// const paymentRoute = require("./routes/payment")

const app = express();
const dotenv = require("dotenv").config();
var cors = require("cors");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use(cookieParser());

//error handler

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).send(errorMessage);
});

//Middlewares

app.use("/api/auth", authRoute);
app.use("/api/pins", pinRoute);
app.use("/api/search", searchRoute);
// app.use("/api/hotels",hotelRoute)
// app.use("/api/rooms",roomRoute)
// app.use("/api/payment",paymentRoute)

app.listen(process.env.PORT, () => {
  console.log(`Server started at port number ${process.env.PORT}`);
});
