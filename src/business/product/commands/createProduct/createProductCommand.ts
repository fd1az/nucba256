import { Command } from "../../../../shared/domain/Command.js";
import { Either, left, Result, right } from "../../../../shared/Result.js";
import { GenericAppError } from "../../../../shared/AppError.js";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID.js";
import { Validate } from "../../../../shared/Validate.js";
import { CreateProductDTO } from "./createProductDTO.js";
import { CreateProductErrors } from "./createProductErrors.js";
import { IProductRepo } from "../../repository/productRepo.js";
import { Slug } from "../../../../shared/Slug.js";
import { Product } from "../../domain/aggregates/product.js";

type Response = Either<
  | GenericAppError.UnexpectedError
  | CreateProductErrors.ProductAlreadyExists
  | CreateProductErrors.ValidationError
  | Result<any>,
  Result<void>
>;

export class CreateProductCommand
  implements Command<CreateProductDTO, Promise<Response>>
{
  private productRepo: IProductRepo;

  //EL CONSTRUCTOR PODRIA RECIBIR TODAS LAS DEPENDENCIAS (Repositorios, EventStore, Nats, etc)
  constructor(productRepo: IProductRepo) {
    this.productRepo = productRepo;
  }

  validate(command: CreateProductDTO): Result<string> {
    const validation = Validate.isRequiredBulk([
      { argument: command.title, argumentName: "name" },
      { argument: command.stock, argumentName: "stock" },
      { argument: command.price, argumentName: "price" },
    ]);

    if (!validation.success) {
      return Result.fail<string>(validation.message);
    }
    return Result.ok();
  }

  async execute(req: CreateProductDTO): Promise<Response> {
    const prodID = new UniqueEntityID();
    const validate = this.validate(req);

    if (validate.isFailure) {
      return left(
        new CreateProductErrors.ValidationError(validate.getErrorValue())
      ) as Response;
    }

    let { title } = req;

    const slugOrError = Slug.create(title);
    if (slugOrError.isFailure) {
      return left(Result.fail<void>(slugOrError.error)) as Response;
    }

    const productOrError = Product.create(
      {
        title: req.title.trim(),
        slug: slugOrError.getValue(),
        stock: req.stock,
        price: req.price,
      },
      {
        ...req,
      }
    );

    if (productOrError.isFailure) {
      return left(Result.fail<void>(productOrError.error)) as Response;
    }

    const product: Product = productOrError.getValue();
    try {
      await this.productRepo.save(product);
      //EMITIR EVENTO DE DOMINIO / INTEGRACION
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }

    return right(Result.ok<void>()) as Response;
  }
}
