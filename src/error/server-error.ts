import { CustomError } from './custom-error.js';

export class ServerError extends CustomError {
  statusCode = 500;
  code?: string | undefined;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, ServerError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
