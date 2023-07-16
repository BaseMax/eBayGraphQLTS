import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Shipping } from "../../models/shipping.model";
import { Orders } from "../../models/orders.model";
import { Billing } from "../../models/billing.model";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Orders.name) private readonly orderModel: Model<Orders>,
    @InjectModel(Shipping.name) private readonly shippingModel: Model<Shipping>,
    @InjectModel(Billing.name) private readonly billingModel: Model<Billing>,
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

  public async getShippingAddress(userId: string) {
    return await this.shippingModel.findOne({
      userId: this.generateMongoId(userId),
    });
  }

  public async updateShippingAddress(userId: string, csa: Record<any, any>) {
    return await this.shippingModel.findOneAndUpdate(
      { userId: this.generateMongoId(userId) },
      { $set: csa },
      { returnOriginal: false },
    );
  }

  public async createShippingAddress(csa: Record<any, any>) {
    csa.userId = this.generateMongoId(csa.userId);
    return await this.shippingModel.create(csa);
  }

  public async getBillingAddress(userId: string) {
    return await this.billingModel.findOne({
      userId: this.generateMongoId(userId),
    });
  }

  public async updateBillingAddress(userId: string, csa: Record<any, any>) {
    return await this.billingModel.findOneAndUpdate(
      { userId: this.generateMongoId(userId) },
      { $set: csa },
      { returnOriginal: false },
    );
  }

  public async createBillingAddress(csa: Record<any, any>) {
    csa.userId = this.generateMongoId(csa.userId);
    return await this.billingModel.create(csa);
  }
}
