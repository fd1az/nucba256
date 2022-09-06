import * as express from "express";
import { BaseController } from "../../../../config/BaseController.js";
import { CreateProductCommand } from "./createProductCommand.js";
import { CreateProductDTO } from "./createProductDTO.js";
import { CreateProductErrors } from "./createProductErrors.js";

export class CreateProductController extends BaseController {
  private useCase: CreateProductCommand;

  constructor(useCase: CreateProductCommand) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    const dto: CreateProductDTO = req.body as CreateProductDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateProductErrors.ProductAlreadyExists:
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
