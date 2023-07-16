import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Orders } from "../../models/orders.model";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Orders.name) private readonly orderModel: Model<Orders>,
  ) {}

  private generateMongoId(i: string) {
    return new mongoose.Types.ObjectId(i);
  }

  public async makeOrder(
    productId: string,
    totalAmount: number,
    userId: string,
  ) {
    const order = await (
      await this.orderModel.create({
        product: this.generateMongoId(productId),
        userId: this.generateMongoId(userId),
        totalAmount,
      })
    ).populate([
      { path: "product", populate: { path: "seller" } },
      { path: "userId" },
    ]);
    return order;
  }

  public async getOrderByProduct(productId: string) {
    const order = await (
      await this.orderModel.findOne({
        product: this.generateMongoId(productId),
      })
    ).populate([
      { path: "product", populate: { path: "seller" } },
      { path: "userId" },
    ]);
    return order;
  }

  public async getOrderByUser(userId: string) {
    const order = await (
      await this.orderModel.findOne({
        userId: this.generateMongoId(userId),
      })
    ).populate([
      { path: "product", populate: { path: "seller" } },
      { path: "userId" },
    ]);
    return order;
  }
}
