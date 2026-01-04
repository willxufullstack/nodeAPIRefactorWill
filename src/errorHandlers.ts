import { Request, Response, NextFunction } from "express";

// Error utilities to make responses consistent.
export function sendError(res: Response, status: number, message: string) {
  return res.status(status).send(message);
}

// 404 fallback for unmatched routes.
export function notFound(_req: Request, res: Response) {
  return sendError(res, 404, "Route not found");
}

// Generic error handler.
export function errorHandler(_err: unknown, _req: Request, res: Response, _next: NextFunction) {
  return sendError(res, 500, "Something went wrong");
}
