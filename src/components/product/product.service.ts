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

  public async getProduct(id: string) {
    const pr = await this.productModel.findOne({ _id: id });
    return pr;
  }

  public async searchProducts(title: string) {
    const pr = await this.productModel.findOne({ title });
    return pr;
  }

  public async getSellerProducts(userId: string) {
    const product = await this.productModel.findOne(
      {
        seller: this.generateMongoId(userId),
      },
      {},
      { populate: [{ path: "seller" }] },
    );

    return product;
  }

  public async getProductReviews(productId: string) {
    return await this.productModel.findOne({
      _id: this.generateMongoId(productId),
    });
  }
}
