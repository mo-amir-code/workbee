import * as express from 'express';
import { UserMiddlewareType } from './middlewares/index.ts';

declare global {
  namespace Express {
    interface Request {
      user: UserMiddlewareType;
    }
  }
}