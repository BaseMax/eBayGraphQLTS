import { CreateProductInput } from "./create-product.input";
import { PartialType } from "@nestjs/mapped-types";
import { Field } from "@nestjs/graphql";

export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field()
  productId: string;
}
