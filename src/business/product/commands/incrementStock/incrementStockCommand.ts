import { Command } from "../../../../shared/domain/Command.js";
import { Either, left, Result, right } from "../../../../shared/Result.js";
import { GenericAppError } from "../../../../shared/AppError.js";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID.js";
import { Validate } from "../../../../shared/Validate.js";
import { IncrementStockDTO } from "./incrementStockDTO.js";
import { IncrementStockErrors } from "./incrementStockErrors.js";
import { IProductRepo } from "../../repository/productRepo.js";
import { Slug } from "../../../../shared/Slug.js";
import { Product } from "../../domain/aggregates/product.js";
import { IEventStore } from "../../../../shared/EventStorePrisma.js";

type Response = Either<
  | GenericAppError.UnexpectedError
  | IncrementStockErrors.ValidationError
  | Result<any>,
  Result<void>
>;

export class IncrementStockCommand
  implements Command<IncrementStockDTO, Promise<Response>>
{
  private productRepo: IProductRepo;
  private eventStoreRepo: IEventStore;

  //EL CONSTRUCTOR PODRIA RECIBIR TODAS LAS DEPENDENCIAS (Repositorios, EventStore, Nats, etc)
  constructor(productRepo: IProductRepo, eventStoreRepo: IEventStore) {
    this.productRepo = productRepo;
    this.eventStoreRepo = eventStoreRepo;
  }

  validate(command: IncrementStockDTO): Result<string> {
    const validation = Validate.isRequiredBulk([
      { argument: command.id, argumentName: "id" },
      { argument: command.quantity, argumentName: "quantity" },
    ]);

    if (!validation.success) {
      return Result.fail<string>(validation.message);
    }
    return Result.ok();
  }

  async execute(req: IncrementStockDTO): Promise<Response> {
    const validate = this.validate(req);

    if (validate.isFailure) {
      return left(
        new IncrementStockErrors.ValidationError(validate.getErrorValue())
      ) as Response;
    }

    let { quantity, id } = req;

    let events = await this.eventStoreRepo.getAggregateById(id);
    let productOrError = Product.build(
      events.getValue(),
      new UniqueEntityID(id)
    );

    if (productOrError.isFailure) {
      return left(Result.fail<void>(productOrError.error)) as Response;
    }

    const product: Product = productOrError.getValue();

    product.incrementStock(quantity);

    try {
      await this.productRepo.save(product);
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }

    return right(Result.ok<void>()) as Response;
  }
}
