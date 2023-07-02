const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Middle ware
// app.use("/posts", () => {
//   console.log("this is middleware");
// });

// Import the Routes
const postRoute = require("./routes/posts");
app.use("/posts", postRoute);

const usersRoute = require("./routes/users");
app.use("/users", usersRoute);

// ROUTES
// GET() -> fetch the data
// POST() -> push the data
// PATCH() -> updated
// DELETE() -> delete the data

app.get("/", (req, res) => {
  res.send("MENU");
});
require("mongoose");

app.get("/getData", (req, res) => {
  res.send("Data");
});

// Connect the mongoDB
mongoose.connect(
  process.env.DB_CONNECTION

  // () => {
  //   console.log("connected");
  // }
);

// Listening port
app.listen(3000, () => {
  console.log("App is running");
});
