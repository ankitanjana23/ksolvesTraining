const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const imageRoutes = require("./routes/imageRoutes");
const errorHandler = require("./middlewares/errorHandler");
const pool = require("./config/db");


const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api", imageRoutes);

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch(() => console.log("database connection error "));

  app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Simple port listen on : 3000`);
});
