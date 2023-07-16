import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentResolver } from "./payment.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import paymentSchema, { Payment } from "../../models/payment.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: paymentSchema }]),
  ],
  providers: [PaymentResolver, PaymentService],
})
export class PaymentModule {}
