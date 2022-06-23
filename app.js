const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
mongoose.connect("mongodb://localhost/apiproject");

const app = express();
app.use(helmet());
//Routes
const users = require("./routes/users");
const cars = require("./routes/cars");

//MiddleWare
app.use(logger("dev"));
app.use(bodyParser.json());

//Routes
app.use("/users", users);
app.use("/cars", cars);
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "You have requested index page",
  });
});

//Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error("Not found ");
  err.status = 404;
  next(err);
});
//Error handler function
app.use((err, re, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  //Respond to client
  res.status(status).json({
    error: {
      message: error.message,
    },
  });
  //Respond to ourselves
  console.log(err);
});
//Start the server
const port = app.get("port") || 5000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
