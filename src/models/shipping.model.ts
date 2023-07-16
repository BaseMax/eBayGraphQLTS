import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Types } from "mongoose";

type ShippingDocument = HydratedDocument<Shipping>;

@Schema({
  validateBeforeSave: false,
  timestamps: {
    createdAt: true,
  },
})
class Shipping extends Document {
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

const shippingSchema = SchemaFactory.createForClass(Shipping);

export default shippingSchema;
export { ShippingDocument, Shipping };
