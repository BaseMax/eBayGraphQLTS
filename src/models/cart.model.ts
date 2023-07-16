import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Types } from "mongoose";

type CartDocument = HydratedDocument<Cart>;

@Schema({
  validateBeforeSave: false,
  timestamps: {
    createdAt: true,
  },
})
class Cart extends Document {
  @Prop({
    type: Number,
    default: 0,
    required: true,
  })
  quantity: number;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: "Product",
  })
  product: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: "User",
  })
  userId: Types.ObjectId;
}

const cartSchema = SchemaFactory.createForClass(Cart);

export default cartSchema;
export { CartDocument, Cart };
