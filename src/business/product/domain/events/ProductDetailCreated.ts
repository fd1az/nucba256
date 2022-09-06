import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent.js";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID.js";
import { Product } from "../aggregates/product.js";

export class ProductCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public entity: Product;
  public command: any;
  public type: string;

  constructor(category: Product, command?: any) {
    this.dateTimeOccurred = new Date();
    this.entity = category;
    this.type = "product:created";
    this.command = command;
  }

  getAggregateId(): UniqueEntityID {
    return this.entity.id;
  }
}
