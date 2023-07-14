import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Category } from "src/models/category.model";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  private generateMongoId(i: string) {
    return new mongoose.Types.ObjectId(i);
  }

  public async createCategory(catName: string, subCatId?: string) {
    return await (
      await this.categoryModel.create({
        name: catName,
        subCategory: subCatId ? this.generateMongoId(subCatId) : null,
      })
    ).populate({ path: "subCategory" });
  }

  public async getSubcategories(catId?: string) {
    return await this.categoryModel.find(
      { _id: this.generateMongoId(catId) },
      {},
      { populate: [{ path: "subCategory" }] },
    );
  }
}
