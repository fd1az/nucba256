import { CustomError } from './custom-error.js';

export class CurrenciesDontMatch extends CustomError {
  statusCode = 400;
  code?: string | undefined;
  first: string;
  second: string;
  constructor(first: string, second: string) {
    super('Currency do not match');
    this.first = first;
    this.second = second;
    Object.setPrototypeOf(this, CurrenciesDontMatch.prototype);
  }
  serializeErrors() {
    return [
      {
        message: `Currencies [${this.first}] and [${this.second}] don't match`,
      },
    ];
  }
}
