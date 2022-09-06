import { Router } from "express";

import ProductRouter from "../business/product/infra/routes/product.routes.js";
const router = Router();

router.use("/products", ProductRouter);

export default router;
