import express from "express";
import tasksRouter from "./tasks.js";
import { errorHandler, notFound } from "./errorHandlers.js";

// App composition. Keeping middleware and routes in one place
export function createApp() {
  const app = express();

  app.use(express.json()); // Middleware
  app.use("/tasks", tasksRouter); // Routes
  app.use(notFound); // Not found handlers
  app.use(errorHandler); // Error handlers

  return app;
}
