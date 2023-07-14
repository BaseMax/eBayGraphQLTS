import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderResolver } from "./order.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import ordersSchema, { Orders } from "../../models/orders.model";
import shippingSchema, { Shipping } from "../../models/shipping.model";
import billingSchema, { Billing } from "../../models/billing.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Orders.name, schema: ordersSchema },
      { name: Shipping.name, schema: shippingSchema },
      { name: Billing.name, schema: billingSchema },
    ]),
  ],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
