import * as express from 'express';
import { UserMiddlewareType } from './middlewares/index.ts';
import { UserTableType } from './db-services/index.ts';

declare global {
  namespace Express {
    interface Request {
      user: UserMiddlewareType | UserTableType;
    }
  }
}