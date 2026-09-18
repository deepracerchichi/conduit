import type {RequestHandler} from "express";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const requireUser: RequestHandler = (req, res, next) => {
    const userId = req.header("x-user-id");
    if (!userId) {
        return res.status(401).json({ error: { message: "Missing x-user-id header" } });
    }
    req.userId = userId;
    next();
}