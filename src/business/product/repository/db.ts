import { PrismaClient as ProductClient } from "../../../../prisma/generated/productClient/index.js";

const prisma = new ProductClient();

export { ProductClient };

export default prisma;
