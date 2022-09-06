import { DomainEvents } from "../../../shared/domain/events/DomainEvents.js";
import { IDomainEvent } from "../../../shared/domain/events/IDomainEvent.js";
import { IHandle } from "../../../shared/domain/events/IHandle.js";
import { IEventStore } from "../../../shared/EventStorePrisma.js";

import { ProductCreated } from "../domain/events/ProductDetailCreated.js";

export class AfterProductCreated implements IHandle<ProductCreated> {
  private eventStore: IEventStore;

  constructor(es: IEventStore) {
    this.setupSubscriptions();
    this.eventStore = es;
  }

  setupSubscriptions(): void {
    console.log("Subcription created");
    DomainEvents.register(
      this.ProductCreatedEvent.bind(this),
      ProductCreated.name
    );
  }

  private async ProductCreatedEvent(event: ProductCreated): Promise<void> {
    await this.eventStore
      .append(event)
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
