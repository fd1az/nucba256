import { IncrementStockCommand } from "./incrementStockCommand.js";
import { IncrementStockController } from "./incrementStockController.js";
import { ProductRepo } from "../../repository/index.js";
import ProductClient from "../../repository/db.js";

import { ProductMapper } from "../../mappers/ProductMapper.js";
import { EventStoreRepository } from "../../repository/ESRepository.js";
import EventoStoreClient from "../../../../shared/EventStorePrisma.js";

const productRepo = new ProductRepo(ProductClient, new ProductMapper());
const eventStore = new EventStoreRepository(EventoStoreClient);
const incrementStockCommand = new IncrementStockCommand(
  productRepo,
  eventStore
);
const incrementStockController = new IncrementStockController(
  incrementStockCommand
);

export { incrementStockCommand, incrementStockController };
