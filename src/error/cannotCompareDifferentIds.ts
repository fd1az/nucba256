import { CustomError } from './custom-error.js';

export class CannotCompareDifferentIds extends CustomError {
  statusCode = 400;
  code?: string | undefined;
  constructor() {
    super('Cannot Compare Different Ids');
    Object.setPrototypeOf(this, CannotCompareDifferentIds.prototype);
  }
  serializeErrors() {
    return [
      {
        message: `Cannot Compare Different Ids`,
      },
    ];
  }
}
