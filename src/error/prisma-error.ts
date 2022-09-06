import { CustomError } from './custom-error.js';

export class PrismaError extends CustomError {
  statusCode = 400;
  prismaError = '';
  entity = '';
  property = '';
  code?: string | undefined;

  constructor(
    public message: string,
    prismaError: string,
    entity: string,
    property: string,
    code?: number
  ) {
    super(message);
    this.statusCode = code ? code : this.statusCode;
    this.prismaError = prismaError;
    this.entity = entity;
    this.property = property;

    Object.setPrototypeOf(this, PrismaError.prototype);
  }

  serializeErrors() {
    this.message = this.getPrismaError(this.prismaError);

    return [{ message: this.message }];
  }

  getPrismaError(errCode: string): string {
    switch (errCode) {
      case 'P2002':
        return `Error ${this.entity}: la propiedad ${this.property} es única`;
      default:
        return 'error desconocido, habla con facu';
    }
  }
}
