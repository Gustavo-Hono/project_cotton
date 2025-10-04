// src/types/express/index.d.ts
import { JwtPayload } from '../index';

declare namespace Express {
  export interface Request {
    usuario?: JwtPayload;
  }
}