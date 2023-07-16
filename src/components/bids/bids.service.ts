import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Bids } from "../../models/bids.model";
import { CreateBidInput } from "./dto/create-bid.input";

@Injectable()
export class BidsService {
  constructor(
    @InjectModel(Bids.name) private readonly bidsModel: Model<Bids>,
  ) {}
  private generateMongoId(i: string) {
    return new mongoose.Types.ObjectId(i);
  }

  public async placeBids(pb: CreateBidInput, userId: string) {
    const p = await (
      await this.bidsModel.create({
        amount: pb.amount,
        product: this.generateMongoId(pb.productId),
        userId: this.generateMongoId(userId),
      })
    ).populate([{ path: "product", populate: { path: "seller" } }]);
    return p;
  }

  public async getBidsByProduct(productId: string) {
    const bid = await this.bidsModel.findOne(
      { product: this.generateMongoId(productId) },
      {},
      { populate: [{ path: "product", populate: { path: "seller" } }] },
    );
    return bid;
  }

  public async getBidsByUser(userId: string) {
    const bid = await this.bidsModel.findOne(
      {
        userId: this.generateMongoId(userId),
      },
      {},
      {
        populate: [
          { path: "product", populate: { path: "seller" } },
          { path: "userId" },
        ],
      },
    );
    return bid[0];
  }
}
