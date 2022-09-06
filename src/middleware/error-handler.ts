import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../error/custom-error.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
      code: err.code,
      statusCode: err.statusCode,
    });
  }
  res.status(400).send({ errors: [{ message: 'algo salio mal' }] });
};
