import { CreateProductController } from "./createProductController.js";
import { CreateProductCommand } from "./createProductCommand.js";
import { ProductRepo } from "../../repository/index.js";
import ProductClient from "../../repository/db.js";
import { ProductMapper } from "../../mappers/ProductMapper.js";

const productRepo = new ProductRepo(ProductClient, new ProductMapper());
const createProductCommand = new CreateProductCommand(productRepo);
const createProductController = new CreateProductController(
  createProductCommand
);

export { createProductCommand, createProductController };
