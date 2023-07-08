import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Cart } from "../../models/cart.model";
import { CreateCartInput } from "./dto/create-cart.input";

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
  ) {}

  private generateMongoId(i: string) {
    return new mongoose.Types.ObjectId(i);
  }
  public async addToCart(ac: CreateCartInput, userId: string) {
    const atc = await (
      await this.cartModel.create({
        userId: this.generateMongoId(userId),
        quantity: ac.quantity,
        product: this.generateMongoId(ac.productId),
      })
    ).populate([
      { path: "userId" },
      { path: "product", populate: { path: "seller" } },
    ]);
    return atc;
  }

  public async getCartByUser(userId: string) {
    return await this.cartModel.findOne(
      { userId: this.generateMongoId(userId) },
      {},
      {
        populate: [
          { path: "userId" },
          { path: "product", populate: { path: "seller" } },
        ],
      },
    );
  }

  public async getCartCount(userId: string) {
    const itemCount = await this.cartModel
      .find({ userId: this.generateMongoId(userId) })
      .count();
    return {
      itemCount,
    };
  }
}
