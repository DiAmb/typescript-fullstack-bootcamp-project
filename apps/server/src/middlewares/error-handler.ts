import type { NextFunction, Request, Response } from 'express'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void {
  if (err.message === 'Product not found') {
    res.status(404).json({ error: err.message })
  } else {
    res.status(500).json({ error: 'Internal server error' })
  }
}
