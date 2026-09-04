import mongoose from "mongoose";
import {env} from "../config/env.js"


export async function connectToDatabase() {
  
  
  try {
  await mongoose.connect(env.MONGODB_URI);
  console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Error connecting to MongoDB", e);
    return process.exit(1);
  }
}