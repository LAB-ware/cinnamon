import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

import { printRoutes } from "./utils/routing";
import routes from "./api/routes.config";

// Constants
const CINNAMON_MONGODB_URI = process.env.CINNAMON_MONGODB_URI || "";

// Check if required env vars are defined
if (!CINNAMON_MONGODB_URI) {
  console.error("missing CINNAMON_MONGODB_URI from env");
  process.exit(1);
}

// Initialize Mongo database
mongoose
  .connect(CINNAMON_MONGODB_URI)
  .then(() => console.log("Successfully connected to database"))
  .catch((error) => {
    console.error("Database connection failed. Exiting now...", error);
    process.exit(1);
  });

// Configure Express server
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Route to ping server
app.get("/ping", (req, res) => res.send("pong\n"));

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`\nServer running on http://localhost:${process.env.PORT}`);
  printRoutes(app);
});
