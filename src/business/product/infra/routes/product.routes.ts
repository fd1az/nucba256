import { Router } from "express";

import { createProductController } from "../../commands/createProduct/index.js";
import { incrementStockController } from "../../commands/incrementStock/index.js";
const router = Router();

router.post("/", (req, res) => createProductController.execute(req, res));
router.post("/incrementStock", (req, res) =>
  incrementStockController.execute(req, res)
);

export default router;
