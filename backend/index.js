const express = require("express");
const mongoose = require("mongoose");
const dotenv =require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

mongoose
.connect(`mongodb+srv://devNish17:na!nskh!atnat@nishant117.72wnkac.mongodb.net/billing`)
.then(() => {
    console.log("Database connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });