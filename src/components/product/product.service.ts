import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Product } from "../../models/product.model";
import { User } from "../../models/user.model";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  private generateMongoId(id: string) {
    return new mongoose.Types.ObjectId(id);
  }

  public async createProduct(sellerId: string, pr: CreateProductInput) {
    return await (
      await this.productModel.create({
        description: pr.description,
        price: pr.price,
        title: pr.title,
        seller: this.generateMongoId(sellerId),
      })
    ).populate({ path: "seller" });
  }

  public async updateProduct(pr: UpdateProductInput) {
    const productId = pr.productId;
    delete pr.productId;

    return await this.productModel.findOneAndUpdate(
      { _id: productId },
      { $set: pr },
      { returnOriginal: false, populate: { path: "seller" } },
    );
  }

  public async deleteProduct(id: string) {
    const { deletedCount } = await this.productModel.deleteOne({ _id: id });

    return {
      id,
      deleted: deletedCount >= 1 ? true : false,
    };
  }
}
