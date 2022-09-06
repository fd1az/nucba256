import { DomainEvents } from "../../../shared/domain/events/DomainEvents.js";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID.js";
import { Mapper } from "../../../shared/Mapper.js";
import { Result } from "../../../shared/Result.js";
import { Product } from "../domain/aggregates/product.js";
import { ProductDTO } from "../domain/models/aggregates/productDetails.js";
import { ProductClient } from "./db.js";

export interface IProductRepo {
  getById(id: UniqueEntityID): Promise<Result<Product>>;
  save(data: Partial<Product>): Promise<Result<void>>;
  delete(ids: UniqueEntityID[]): Promise<Result<void>>;
}

export class ProductRepo implements IProductRepo {
  producClient: ProductClient;
  mapper: Mapper<Product, ProductDTO>;
  constructor(
    producClient: ProductClient,
    mapper: Mapper<Product, ProductDTO>
  ) {
    this.producClient = producClient;
    this.mapper = mapper;
  }

  async getById(id: UniqueEntityID): Promise<Result<Product>> {
    let product = await this.producClient.product.findUnique({
      where: { id: id.toString() },
    });

    if (product) {
      return Result.ok<Product>(this.mapper.toDomain(product));
    }
    return Result.fail("Not found");
  }

  async exist(title: string): Promise<Result<boolean>> {
    const category = await this.producClient.product.findFirst({
      where: {
        title,
      },
    });
    if (category) {
      return Result.ok(true);
    }
    return Result.fail("Not found");
  }

  async save(data: Partial<Product>): Promise<Result<void>> {
    const product = this.mapper.toPersistence(data);
    const trx = await this.saveProduct(product);
    console.log(trx);
    return trx;
  }

  async delete(ids: UniqueEntityID[]): Promise<Result<void>> {
    throw new Error("Method not implemented.");
  }

  private async saveProduct(product: ProductDTO): Promise<Result<void>> {
    //dispatch Events

    this.producClient.$use(async (params, next) => {
      const result = await await next(params);
      if (params.model == "Product" && params.action == "upsert") {
        console.log(`Product id: ${result.id}`);
        DomainEvents.dispatchEventsForAggregate(new UniqueEntityID(result.id));
        console.log(`DispathEvents for Aggregate: Product-${result.id}`);
      }
      return result;
    });

    try {
      await this.producClient.product.upsert({
        where: { id: product.id?.toString() },
        create: {
          ...product,
          id: product.id!,
        },
        update: {
          ...product,
          id: product.id!,
        },
      });

      return Result.ok();
    } catch (error: any) {
      return Result.fail<any>(error);
    }
  }
}
