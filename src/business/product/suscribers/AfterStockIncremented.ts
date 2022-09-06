import { DomainEvents } from "../../../shared/domain/events/DomainEvents.js";
import { IDomainEvent } from "../../../shared/domain/events/IDomainEvent.js";
import { IHandle } from "../../../shared/domain/events/IHandle.js";
import { IEventStore } from "../../../shared/EventStorePrisma.js";
import { ProductStockIncremented } from "../domain/events/PorductStockIncremented.js";

import { ProductCreated } from "../domain/events/ProductDetailCreated.js";

export class AfterStockIncrementedCreated
  implements IHandle<ProductStockIncremented>
{
  private eventStore: IEventStore;

  constructor(es: IEventStore) {
    this.setupSubscriptions();
    this.eventStore = es;
  }

  setupSubscriptions(): void {
    console.log("Subcription created");
    DomainEvents.register(
      this.StockIncrementedEvent.bind(this),
      ProductStockIncremented.name
    );
  }

  private async StockIncrementedEvent(
    event: ProductStockIncremented
  ): Promise<void> {
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
