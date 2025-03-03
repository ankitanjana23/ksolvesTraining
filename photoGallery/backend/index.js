const express = require("express");
const cors = require("cors");
require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler");
const imageRoutes = require("./routes/imageRoutes");
const pool = require("./config/db");
const logger = require("./logger");
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./src/schema');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", imageRoutes);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

async function startServer() {
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  pool
    .connect()
    .then(() => logger.info("Connected to PostgreSQL database"))
    .catch(() => logger.error("Database connection error"));

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
