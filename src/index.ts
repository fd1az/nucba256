import { app } from "./app.js";
import { Express } from "express";
import { Server } from "http";
import logger from "./config/log.js";

//INIT SERVER
const VERSION = "0.0.1";

const start = (app: Express): Server => {
  if (!process.env.PORT) {
    throw new Error("NO PORT ENV");
  }
  if (!process.env.NODE_ENV) {
    throw new Error("NO NODE_ENV ENV");
  }

  if (!process.env.PRODUCT_DATABASE_URL) {
    throw new Error("NO PRODUCT_DATABASE_URL ENV");
  }
  if (!process.env.ES_DATABASE_URL) {
    throw new Error("NO ES_DATABASE_URL ENV");
  }

  return app.listen(process.env.PORT, () => {
    logger.info(
      `Server running in ${process.env.NODE_ENV!} mode on port ${process.env
        .PORT!}.`,
      {
        service: "test",
        version: VERSION,
      }
    );
  });
};

const server = start(app);
