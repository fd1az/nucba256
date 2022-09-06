import { IDomainEvent } from "../../../shared/domain/events/IDomainEvent.js";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID.js";
import {
  EventoStoreClient,
  IEventStore,
} from "../../../shared/EventStorePrisma.js";
import { Result } from "../../../shared/Result.js";

export class EventStoreRepository implements IEventStore {
  private eventStoreClient: EventoStoreClient;
  constructor(client: EventoStoreClient) {
    this.eventStoreClient = client;
  }

  async append(event: IDomainEvent<any, any>): Promise<Result<void>> {
    try {
      await this.eventStoreClient.eventStore.create({
        data: {
          streamId: event.getAggregateId().toString(),
          eventName: event.type,
          eventData: event.entity,
          metaData: event.command,
        },
      });
      return Result.ok();
    } catch (error) {
      return Result.fail(error);
    }
  }
  async getAggregateById(
    aggregateId: string
  ): Promise<Result<IDomainEvent<any, any>[]>> {
    try {
      const events = await this.eventStoreClient.eventStore.findMany({
        where: {
          streamId: aggregateId,
        },
      });

      return Result.ok<IDomainEvent<any, any>[]>(
        events.map(this.parseDomainEvents)
      );
    } catch (error) {
      return Result.fail(error);
    }
  }

  parseDomainEvents(event: any): IDomainEvent {
    return {
      dateTimeOccurred: event.storedAt,
      type: event.eventName,
      command: event.metaData,
      entity: event.eventData,
      getAggregateId(): UniqueEntityID {
        return new UniqueEntityID(event.streamId);
      },
    };
  }
}
