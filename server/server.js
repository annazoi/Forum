const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

// Import the Routes
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());

// Import the Routes
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
// ROUTES
// GET() -> fetch the data
// POST() -> push the data
// PATCH() -> updated
// DELETE() -> delete the data

app.get("/", (req, res) => {
  res.send("MENU");
});

app.get("/data", (req, res) => {
  res.status(200).json([
    { id: 1, title: "title 1" },
    { id: 2, title: "title 2" },
  ]);
});

// Connect the mongoDB
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  // Listening port
  app.listen(3000, () => {
    console.log("App is running");
  });
});
