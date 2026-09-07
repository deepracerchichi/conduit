import { env } from "./config/env.js";
import express from "express";
import { connectToDatabase } from "./db/connect.js";
import { workflowsRouter } from "./routes/workflow.js";
import { errorHandler } from "./middleware/errorHandler.js";

await connectToDatabase();

const app = express();
app.use(express.json());

// --- routes ---
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.use("/workflows", workflowsRouter);

// --- 404: nothing above matched ---
app.use((req, res) => {
  res.status(404).json({ error: { message: `Not found: ${req.method} ${req.originalUrl}` } });
});

// --- error handler: MUST be registered last ---
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
