import * as express from "express";
import { BaseController } from "../../../../config/BaseController.js";
import { IncrementStockCommand } from "./incrementStockCommand.js";
import { IncrementStockDTO } from "./incrementStockDTO.js";
import { IncrementStockErrors } from "./incrementStockErrors.js";

export class IncrementStockController extends BaseController {
  private useCase: IncrementStockCommand;

  constructor(useCase: IncrementStockCommand) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    const dto = req.body as IncrementStockDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case IncrementStockErrors.ValidationError:
            return this.conflict(res, error.getErrorValue());
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}
