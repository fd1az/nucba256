import { UniqueEntityID } from "../UniqueEntityID.js";

export interface IDomainEvent<T = any, E = any> {
  dateTimeOccurred: Date;
  type: string;
  command: T;
  entity: E;
  getAggregateId(): UniqueEntityID;
}
