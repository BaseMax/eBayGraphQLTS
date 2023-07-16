import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryResolver } from "./category.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import categorySchema, { Category } from "../../models/category.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: categorySchema },
    ]),
  ],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
