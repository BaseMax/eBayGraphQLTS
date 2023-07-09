import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderResolver } from "./order.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import ordersSchema, { Orders } from "../../models/orders.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Orders.name, schema: ordersSchema }]),
  ],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
