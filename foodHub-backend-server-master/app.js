const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Math.floor(Math.random() * 90000) + 10000 + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  )
    cb(null, true);
  else cb(null, false);
};

const app = express();

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

//set headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", upload.array("images", 10), authRoutes);
app.use(userRoutes);

//error middleware
app.use((error, req, res, next) => {
  console.log(error + "--------------------------");
  const statusCode = error.statusCode || 500;
  const message = error.message;
  let errorsPresent;
  if (error.errors) {
    errorsPresent = error.errors;
  }

  res.status(statusCode).json({
    message: message,
    errors: errorsPresent,
  });
});

const clients = {};

mongoose
  .connect(
    // 'mongodb+srv://abhinanda%2Egp:Rapid%4012345@cluster0-jtpxd.mongodb.net/restaurantApp?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true'
    'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
  )
  .then((result) => {
    console.log("Connected to db");
    const server = app.listen(process.env.PORT || 3002);
  })
  .catch((err) => console.log(err));

exports.clients = clients;