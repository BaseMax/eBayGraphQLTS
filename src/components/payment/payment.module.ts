import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentResolver } from "./payment.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import paymentSchema, { Payment } from "../../models/payment.model";
import ordersSchema, { Orders } from "../../models/orders.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: paymentSchema },
      { name: Orders.name, schema: ordersSchema },
    ]),
  ],
  providers: [PaymentResolver, PaymentService],
})
export class PaymentModule {}
