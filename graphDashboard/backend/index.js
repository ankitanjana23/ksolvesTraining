const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const dataRoutes = require("./routes/dataRoutes");

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api", dataRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
