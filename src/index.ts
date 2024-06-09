import express from "express";
import { errorHandler } from "./controllers/errorHandler";
import { createModels } from "./postgres";
import { logger, loggerMiddleWare, reqIdLogging } from "./logger/logger";

const app = express();
const db = createModels();
db.sequelize.sync();

app.use(reqIdLogging, loggerMiddleWare);
app.use("/health", async (req, res) => {
    try {
        res.writeHead(200);
        res.end("Healthy");
    } catch (err) {
        res.status(500).send("Internal server error")
    }
});

app.use("/api/auth/", require("./routers/user"), errorHandler);
app.use("/api/profile/cart", require("./routers/cart"), errorHandler);
app.use("/api/products", require("./routers/products"), errorHandler);

const server = app.listen(process.env.PORT, () =>
  logger.info(`Server started on port ${process.env.PORT}`)
);

let connections = [];

server.on("connection", (connection) => {
  connections.push(connection);

  connection.on("close", () => {
    connections = connections.filter(
      (currentConnection) => currentConnection !== connection
    );
  });
});

const shutdown = () => {
  logger.info("Received kill signal, shutting down gracefully");

  server.close(() => {
    logger.info("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 20000);

  connections.forEach((connection) => connection.end());

  setTimeout(() => {
    connections.forEach((connection) => connection.destroy());
  }, 10000);
}

const logUncaughtError = (err) => {
    logger.error('Error', err);
    process.exit(1);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
process.on("uncaughtException", logUncaughtError);
process.on("unhandledRejection", logUncaughtError);