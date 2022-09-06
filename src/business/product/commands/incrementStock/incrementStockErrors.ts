import { Result } from "../../../../shared/Result.js";
import { UseCaseError } from "../../../../shared/UseCaseError.js";

export namespace IncrementStockErrors {
  export class ValidationError extends Result<UseCaseError> {
    constructor(message: string) {
      super(false, {
        message: `validation error: ${message}`,
      } as UseCaseError);
    }
  }
}
