import EventoStoreClient from "../../../shared/EventStorePrisma.js";
import { EventStoreRepository } from "../repository/ESRepository.js";
import { AfterProductCreated } from "./AfterProductCreated.js";
import { AfterStockIncrementedCreated } from "./AfterStockIncremented.js";

// Subscribers
new AfterProductCreated(new EventStoreRepository(EventoStoreClient));
new AfterStockIncrementedCreated(new EventStoreRepository(EventoStoreClient));
