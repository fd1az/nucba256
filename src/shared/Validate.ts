import { Result } from './Result.js';

export type ValidateResult = {
  message?: string;
  success: boolean;
};

export type ValidateArgument = {
  argument: any;
  argumentName: string;
};

export type ValidateResponse = string;

export type ValidateArgumentCollection = ValidateArgument[];

export const isEmpty = (argument: any): boolean => {
  return argument === null || argument === undefined || argument === '';
};

export const isNullOrUndefined = (argument: any): boolean => {
  return argument === null || argument === undefined;
};

export class Validate {
  public static isRequired(
    argument: any,
    argumentName: string
  ): ValidateResult {
    if (!isEmpty(argument)) return { success: true };

    return {
      success: false,
      message: `${argumentName} can't be empty it's required`,
    };
  }
  public static isRequiredBulk(
    args: ValidateArgumentCollection
  ): ValidateResult {
    for (const arg of args) {
      const result = this.isRequired(arg.argument, arg.argumentName);
      if (!result.success) return result;
    }

    return { success: true };
  }

  public static isDate(argument: Date, argumentName: string): ValidateResult {
    if (
      argument.getMonth &&
      !isNullOrUndefined(argument.getMonth()) &&
      !Number.isNaN(argument.getMonth())
    )
      return { success: true };

    return { success: false, message: `${argumentName} is not a valid Date` };
  }

  public static isStringDate(
    argument: string,
    argumentName: string
  ): ValidateResult {
    if (Date.parse(argument)) return { success: true };

    return { success: false, message: `${argumentName} is not a valid Date` };
  }
  public static isGreaterThan(
    num: number,
    min: number,
    argumentName: string
  ): ValidateResult {
    const isGreaterThan = num > min;
    if (!isGreaterThan || Number.isNaN(num)) {
      return {
        success: false,
        message: `${argumentName} is not greater than ${min}.`,
      };
    }
    return { success: true };
  }

  public static isGreaterOrEqualThan(
    num: number,
    min: number,
    argumentName: string
  ): ValidateResult {
    const isGreaterThan = num >= min;
    if (!isGreaterThan || Number.isNaN(num)) {
      return {
        success: false,
        message: `${argumentName} is not greater or equal than ${min}.`,
      };
    }
    return { success: true };
  }

  public static isLessThan(
    num: number,
    max: number,
    argumentName: string
  ): ValidateResult {
    const isLessThan = num < max;
    if (!isLessThan || Number.isNaN(num)) {
      return {
        success: false,
        message: `${argumentName} is not less than ${max}.`,
      };
    }
    return { success: true };
  }
  public static againstNullOrUndefined(
    argument: any,
    argumentName: string
  ): Result<ValidateResponse> {
    if (argument === null || argument === undefined) {
      return Result.fail<ValidateResponse>(
        `${argumentName} is null or undefined`
      );
    } else {
      return Result.ok<ValidateResponse>();
    }
  }

  public static againstNullOrUndefinedBulk(
    args: ValidateArgumentCollection
  ): Result<ValidateResponse> {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName
      );
      if (result.isFailure) return result;
    }

    return Result.ok<ValidateResponse>();
  }

  public static inRange(
    num: number,
    min: number,
    max: number,
    argumentName: string
  ): ValidateResult {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return {
        success: false,
        message: `${argumentName} is not within range ${min} to ${max}.`,
      };
    } else {
      return { success: true };
    }
  }
}
