import { UniqueEntityID } from "../../../../../shared/domain/UniqueEntityID.js";
import { Slug } from "../../../../../shared/Slug.js";

//PROPS
export type ProductProps = {
  id?: UniqueEntityID;
  title: string;
  slug: Slug;
  stock: number;
  price: number;
};

export type ProductDTO = {
  id?: string;
  title: string;
  slug: string;
  stock: number;
  price: number;
};
