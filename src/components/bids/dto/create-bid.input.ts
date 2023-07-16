import { Field } from "@nestjs/graphql";

export class CreateBidInput {
  @Field()
  amount: number;

  @Field()
  productId: string;
}
