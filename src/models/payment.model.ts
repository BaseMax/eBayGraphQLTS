import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Types } from "mongoose";

type PaymentDocument = HydratedDocument<Payment>;

@Schema({
  validateBeforeSave: false,
  timestamps: {
    createdAt: true,
  },
})
class Payment extends Document {
  @Prop({
    type: String,
  })
  type: string;

  @Prop({
    type: String,
  })
  cvv: string;

  @Prop({
    type: String,
  })
  expirationDate: string;

  @Prop({
    type: Types.ObjectId,
    ref: "User",
  })
  userId: string;

  @Prop({
    type: String,
  })
  cardNumber: string;
}

const paymentSchema = SchemaFactory.createForClass(Payment);

export default paymentSchema;
export { PaymentDocument, Payment };
