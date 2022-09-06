import { PrismaClient as EventoStoreClient } from "../../prisma/generated/eventStoreClient/index.js";
import { IDomainEvent } from "./domain/events/IDomainEvent.js";
import { Result } from "./Result.js";

const prisma = new EventoStoreClient();

export { EventoStoreClient };

export interface IEventStore {
  append(event: IDomainEvent): Promise<Result<void>>;
  getAggregateById(aggregateId: string): Promise<Result<IDomainEvent[]>>;
}

export default prisma;
