import {env} from "../src/config/env.js"
import express from "express";
import { connectToDatabase } from "./db/connect.js";

await connectToDatabase();

const app =  express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
})