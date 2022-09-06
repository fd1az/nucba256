import { CustomError } from './custom-error.js';

export class NotFoundError extends CustomError {
  statusCode = 404;
  code?: string | undefined;
  constructor() {
    super('Route not found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not Found' }];
  }
}
