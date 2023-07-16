import { CreatePaymentInput } from "./create-payment.input";
import { PartialType } from "@nestjs/mapped-types";

export class UpdatePaymentInput extends PartialType(CreatePaymentInput) {
  id: number;
}
