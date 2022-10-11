import { Entity } from "./Entity.js";
import { IDomainEvent } from "./events/IDomainEvent.js";
import { DomainEvents } from "./events/DomainEvents.js";
import { UniqueEntityID } from "./UniqueEntityID.js";

// export interface EventApplierDefinition {
//   version?: string;
//   eventName: string;
//   applier: string;
// }

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];
  //protected eventAppliers: EventApplierDefinition[] = [];

  constructor(events: IDomainEvent[], id?: UniqueEntityID) {
    super(id);
    this._domainEvents = [];
    events.forEach((event: IDomainEvent) => this.applyEvent(event));
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent<T>(domainEvent: IDomainEvent<T>): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent);
    // Add this aggregate instance to the domain event's list of aggregates who's
    // events it eventually needs to dispatch.
    DomainEvents.markAggregateForDispatch(this);
    // Log the domain event
    this.logDomainEventAdded(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      `[Domain Event Created]:`,
      thisClass!.constructor.name,
      "==>",
      domainEventClass!.constructor.name
    );
  }

  protected abstract apply(event: IDomainEvent): void;

  protected applyEvent(event: IDomainEvent): void {
    return this.apply(event);
  }

  applyEvents(): void {
    this.domainEvents.forEach((event: IDomainEvent) => this.applyEvent(event));
  }
}
