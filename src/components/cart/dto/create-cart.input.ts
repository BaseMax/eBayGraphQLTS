import { Field } from "@nestjs/graphql";

export class CreateCartInput {
  @Field()
  productId: string;

  @Field()
  quantity: number;
}
