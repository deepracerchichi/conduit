import { RequestHandler } from "express";
import jwt from "jsonwebtoken"
import { env } from "../config/env.js";


declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const requireAuth : RequestHandler = (req, res, next) => {
    const authHeader = req.header("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

    if (!token) {
        return res.status(401).json({error: {message: "Missing or invalid Authorizaion header"}});

    }

    try {
        const payload = jwt.verify(token, env.JWT_SECRET) as {sub: string};
        req.userId = payload.sub;
        next();
    } catch (error) {
        return res.status(401).json({ error: { message: "Invalid or expired token" } });
    }
}