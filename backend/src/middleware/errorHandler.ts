import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);

  // 1. Translate Mongoose's "bad input" errors into our API's language.
  if (err?.name === "CastError" || err?.name === "ValidationError") {
    return res.status(400).json({ error: { message: "Invalid request data" } });
  }

  const statusCode = typeof err?.statusCode === "number" ? err.statusCode : 500;

  // 2. Only expose the message for errors we deliberately threw (4xx).
  //    A 500 is unexpected — never leak internal details to the client.
  const message = statusCode < 500 ? err?.message ?? "Error" : "Internal Server Error";

  return res.status(statusCode).json({ error: { message } });
};

