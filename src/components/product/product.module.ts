import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductResolver } from "./product.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import productSchema, { Product } from "../../models/product.model";
import userSchema, { User } from "../../models/user.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: productSchema },
      { name: User.name, schema: userSchema },
    ]),
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
