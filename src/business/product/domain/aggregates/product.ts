import { AggregateRoot } from "../../../../shared/domain/AggregateRoot.js";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent.js";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID.js";
import { Result } from "../../../../shared/Result.js";
import { Slug } from "../../../../shared/Slug.js";
import { Validate } from "../../../../shared/Validate.js";
import { ProductStockIncremented } from "../events/PorductStockIncremented.js";
import { ProductCreated } from "../events/ProductDetailCreated.js";
import { ProductProps } from "../models/aggregates/productDetails.js";

export class Product extends AggregateRoot<ProductProps> {
  protected apply(event: IDomainEvent<any, any>): void {
    switch (event.type) {
      default:
        const product = event.entity.props;
        this.props.price = product.price || this.props.price;
        this.props.stock = product.stock || this.props.stock;
        this.props.slug = Slug.create(product.title).getValue();
        this.props.title = product.title || this.props.title;
        break;
    }
  }

  static build(events: IDomainEvent[], id?: UniqueEntityID): Result<Product> {
    const aggregateId = id ?? events[events.length - 1].getAggregateId();
    return Result.ok(new Product(events, aggregateId));
  }

  public static create(props: ProductProps, command?: any): Result<Product> {
    const guardResult = Validate.againstNullOrUndefinedBulk([
      { argument: props.title, argumentName: "title" },
      { argument: props.slug, argumentName: "slug" },
      { argument: props.stock, argumentName: "stock" },
      { argument: props.price, argumentName: "price" },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<Product>(guardResult.getErrorValue());
    }

    const idWasProvided = !!props.id;
    const prodId = new UniqueEntityID(props.id?.toString());

    const product = new Product([], prodId);
    product.props.price = props.price;
    product.props.stock = props.stock;
    product.props.slug = props.slug;
    product.props.title = props.title;

    if (!idWasProvided) {
      product.addDomainEvent(new ProductCreated(product, command));
    }

    return Result.ok<Product>(product);
  }

  incrementStock(quantity: number, command?: any): Result<Product> {
    const guardResult = Validate.againstNullOrUndefinedBulk([
      { argument: quantity, argumentName: "quantity" },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<Product>(guardResult.getErrorValue());
    }

    this.props.stock = this.props.stock + quantity;

    this.addDomainEvent(new ProductStockIncremented(this, command));

    this.applyEvents();

    return Result.ok<Product>(this);
  }
}
