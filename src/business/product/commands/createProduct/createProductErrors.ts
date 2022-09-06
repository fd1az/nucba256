import { Result } from "../../../../shared/Result.js";
import { UseCaseError } from "../../../../shared/UseCaseError.js";

export namespace CreateProductErrors {
  export class ProductAlreadyExists extends Result<UseCaseError> {
    constructor(categoryName: string) {
      super(false, {
        message: `The category ${categoryName} already exists`,
      } as UseCaseError);
    }
  }
  export class ValidationError extends Result<UseCaseError> {
    constructor(message: string) {
      super(false, {
        message: `validation error: ${message}`,
      } as UseCaseError);
    }
  }
}
