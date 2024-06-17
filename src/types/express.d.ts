import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;  // or use a specific type instead of `any`
    }
  }
}