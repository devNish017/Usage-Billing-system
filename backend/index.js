const express = require("express");
const mongoose = require("mongoose");
const dotenv =require("dotenv");
const userRoutes = require("./routes/user.routes");
const resourceRoutes = require("./routes/resorce.routes");
const usageRoutes = require("./routes/usage.routes");
const cors = require("cors");


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
mongoose
.connect(process.env.URL)
.then(() => {
    console.log("Database connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });

  app.use("/api/users", userRoutes);
  app.use("/api/resources", resourceRoutes);
  app.use("/api/usage", usageRoutes)