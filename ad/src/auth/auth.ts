import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import myAud from './../config/auth.config';

const errorRes = (res: Response) => res.status(401).send('Unauthorized');

type payloadType = { aud: string };

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.ENV === 'mock') return next();

  const token = req.header('Authorization');
  const key = fs.readFileSync(path.join(__dirname, '../../key.pem'));

  try {
    if (!token) return errorRes(res);

    const payload: payloadType = jwt.verify(
      token,
      key.toString()
    ) as payloadType;

    if (!payload || payload.aud !== myAud) return errorRes(res);

    return next();
  } catch (err) {
    return next(err);
  }
};

export default { isAuth };
