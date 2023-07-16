import { Field } from "@nestjs/graphql";

export class CreatePaymentInput {
  @Field()
  type: string;
  @Field()
  cardNumber: string;
  @Field()
  expirationDate: string;
  @Field()
  cvv: string;
  @Field()
  userId: string;
}
