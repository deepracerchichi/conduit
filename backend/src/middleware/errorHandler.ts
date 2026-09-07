import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Log the real error server-side — for you, not the client.
  console.error(err);

  // If the error carries a statusCode, use it; otherwise it's an unexpected 500.
  const statusCode = typeof err?.statusCode === "number" ? err.statusCode : 500;

  res.status(statusCode).json({
    error: {
      message: err?.message ?? "Internal Server Error",
    },
  });
};
