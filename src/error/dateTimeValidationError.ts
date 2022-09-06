import { CustomError } from './custom-error.js';

export class DateTimeValidationError extends CustomError {
  statusCode = 400;
  code?: string | undefined;
  message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, DateTimeValidationError.prototype);
  }
  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
