import { DateTime } from "../../../shared/DateTime.js";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID.js";
import { Mapper } from "../../../shared/Mapper.js";
import { Slug } from "../../../shared/Slug.js";
import { Product } from "../domain/aggregates/product.js";
import { ProductDTO } from "../domain/models/aggregates/productDetails.js";

export class ProductMapper implements Mapper<Product, ProductDTO> {
  toDomain(raw: ProductDTO): Product {
    const product = Product.create({
      id: new UniqueEntityID(raw.id),
      title: raw.title,
      slug: Slug.create(raw.title).getValue(),
      stock: raw.stock,
      price: raw.price,
    });

    product.isFailure ? console.log(product.error) : "";

    return product.getValue();
  }
  toDTO(t: Product): ProductDTO {
    throw new Error("Method not implemented.");
  }
  toPersistence(p: Product): ProductDTO {
    const product: ProductDTO = {
      id: p.id?.toString(),
      title: p.props.title,
      slug: p.props.slug.slugName,
      price: p.props.price,
      stock: p.props.stock,
    };
    return product;
  }
}
