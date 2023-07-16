import { Module } from "@nestjs/common";
import { BidsService } from "./bids.service";
import { BidsResolver } from "./bids.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import bidsSchema, { Bids } from "../../models/bids.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bids.name, schema: bidsSchema }]),
  ],
  providers: [BidsResolver, BidsService],
})
export class BidsModule {}
