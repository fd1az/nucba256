//DEPENDENCIES
import express from "express";
//import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import path from "path";

//SUBDOMAINS
import "./business/product/index.js";

//middleware
import { errorHandler } from "./middleware/error-handler.js";

//ROutes
import handlersRoute from "./routes/index.js";
// import "./core/business/owners/service/redis/redisConnection.js";

//INIT CONFIGUTARIONS
colors.enable();

// Load env varsss
dotenv.config();

const PORT = process.env.PORT || 5000;

// START EXPRESS APP
const app = express();

app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//GLOBAL MIDDLEWARES
// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Set security headers
app.use(helmet({ contentSecurityPolicy: false }));

// Prevent XSS attacks
//app.use(xss());

// Enable CORS
app.use(cors());

//ROUTES
app.use("/api/v1", handlersRoute);
app.use(errorHandler);

export { app };
