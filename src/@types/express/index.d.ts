import * as core from 'express-serve-static-core';

import { JWTClaims } from '../../core/business/owners/service/jwt.js';

declare global {
  namespace Express {
    interface Request {
      decoded?: JWTClaims;
    }
  }
  namespace NodeJS {
    interface Global {
      signin(): string;
    }
  }
}

export interface Query extends core.Query {}
