import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartResolver } from "./cart.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import cartSchema, { Cart } from "../../models/cart.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: cartSchema }]),
  ],
  providers: [CartResolver, CartService],
})
export class CartModule {}
