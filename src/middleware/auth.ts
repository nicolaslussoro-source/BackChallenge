import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'] || '';
  const parts = (Array.isArray(authHeader) ? authHeader[0] : authHeader).split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'missing token' });

  const token = parts[1];
  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
    const payload = jwt.verify(token, JWT_SECRET) as any;
    (req as any).user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
}
