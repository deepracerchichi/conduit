import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../model/userSchema.js";
import { signupSchema } from "../validation/auth.js";
import { AppError } from "../errors/AppError.js";
import { env } from "../config/env.js";
import { loginSchema } from "../validation/auth.js";

export const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  // 1. Validate
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: { message: "Invalid signup data", details: parsed.error.flatten() } });
  }
  const { email, password } = parsed.data;

  // 2. Hash the password — never store it plain
  const passwordHash = await bcrypt.hash(password, 12);

  // 3. Create the user — let the database's unique index catch duplicates
  let user;
  try {
    user = await UserModel.create({ email, passwordHash });
  } catch (error: any) {
    if (error.code === 11000) {
      throw new AppError("An account with that email already exists", 409);
    }
    throw error;
  }

  // 4. Issue a token immediately — signup logs you in
  const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, { expiresIn: "7d" });

  // 5. Respond — never send passwordHash back
  return res.status(201).json({ token, user: { id: user.id, email: user.email } });
});




authRouter.post("/login", async (req, res) => {
  // 1. Validate
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: { message: "Invalid login data", details: parsed.error.flatten() } });
  }
  const { email, password } = parsed.data;

  // 2. Find the user
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // 3. Verify the password
  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401);
  }

  // 4. Issue a token
  const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, { expiresIn: "7d" });

  // 5. Respond
  return res.json({ token, user: { id: user.id, email: user.email } });
});

