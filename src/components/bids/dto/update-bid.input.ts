import { CreateBidInput } from "./create-bid.input";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateBidInput extends PartialType(CreateBidInput) {
  id: number;
}
