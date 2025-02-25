const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler");
const imageRoutes = require("./routes/imageRoutes");
const pool = require("./config/db");
const logger = require("./logger");

const PORT = process.env.PORT || 3000;
console.log(PORT);

app.use(cors());
app.use(express.json());
app.use("/api", imageRoutes);

pool
  .connect()
  .then(() => logger.info("Connected to PostgreSQL database"))
  .catch(() => logger.error("database connection error "));

app.use(errorHandler);

//if application goes different port gives error

app.listen(PORT, () => {
  console.log(`Simple port listen on : ${PORT}`);
});
