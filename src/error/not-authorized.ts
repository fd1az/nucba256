import { CustomError } from './custom-error.js';

export class UnauthorizedError extends CustomError {
  statusCode = 401;
  code?: string | undefined;
  constructor() {
    super('Unauthorized');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
  serializeErrors() {
    return [{ message: 'Unauthorized' }];
  }
}
