import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Types } from "mongoose";

type BillingDocument = HydratedDocument<Billing>;

@Schema({
  validateBeforeSave: false,
  timestamps: {
    createdAt: true,
  },
})
class Billing extends Document {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: "User",
  })
  userId: Types.ObjectId;

  @Prop({
    type: String,
  })
  street: string;

  @Prop({
    type: String,
  })
  city: string;

  @Prop({
    type: String,
  })
  state: string;

  @Prop({
    type: String,
  })
  zipCode: string;
}

const billingSchema = SchemaFactory.createForClass(Billing);

export default billingSchema;
export { BillingDocument, Billing };
