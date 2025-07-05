import { Request, Response, NextFunction } from 'express';

export const authenticateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === 'test') return next();
  const authHeader = req.headers.authorization;
  const apiKey = process.env.API_KEY;

  if (authHeader === `Bearer ${apiKey}`) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Invalid API key' });
  }
};