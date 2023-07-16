import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateProductInput {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  price: number;
}
