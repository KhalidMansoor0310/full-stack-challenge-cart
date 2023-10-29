const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const db_connect = process.env.DB_CONNECT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/items", require("./routes/item"));
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(db_connect, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(5000, () => {
  console.log(`Server is running on port ${5000}`);
});
