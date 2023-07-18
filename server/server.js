const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

// Import the Routes
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const imageRoutes = require("./routes/image");

const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

// Import the Routes
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
// app.use("/image", imageRoutes);

// ROUTES
// GET() -> fetch the data
// POST() -> push the data
// PATCH() -> updated
// DELETE() -> delete the data
app.post("/uploadPhoto", upload.single("myImage"), (req, res) => {
  const obj = {
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  const newImage = new ImageModel({
    image: obj.img,
  });
  newImage.save((err) => {
    err ? console.log(err) : res.redirect("/");
  });
});
app.get("/", (req, res) => {
  ImageModel.find({}, (err, images) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("image", { images: images });
    }
  });
});

// Connect the mongoDB
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  // Listening port
  app.listen(3000, () => {
    console.log("App is running");
  });
});

app.get("/", (req, res) => {
  res.render("image");
});

const imageSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});
const ImageModel = mongoose.model("Image", imageSchema);
