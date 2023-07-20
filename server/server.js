const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

// Import the Routes
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");

const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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

// Connect the mongoDB
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  // Listening port
  app.listen(3000, () => {
    console.log("App is running");
  });
});
