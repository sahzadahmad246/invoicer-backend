const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Use CORS middleware before defining routes or other middleware that might need it
const corsOptions = {
  origin: "https://invoicer-1c55.onrender.com/",
  methods: "GET, POST, PUT, DELETE, HEAD, FETCH",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json()); // Use express.json to parse JSON data

// Define your routes
const User = require("./models/userSchema");
app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
