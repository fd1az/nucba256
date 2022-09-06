import { CustomError } from './custom-error.js';

export class BadRequestError extends CustomError {
  statusCode = 400;
  code: string;
  constructor(public message: string, code?: string) {
    super(message);
    this.code = code ? code : '';
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
