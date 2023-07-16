import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Types } from "mongoose";

type OrdersDocument = HydratedDocument<Orders>;

@Schema({
  validateBeforeSave: false,
  timestamps: {
    createdAt: true,
  },
})
class Orders extends Document {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: "Product",
  })
  product: [Types.ObjectId];

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: "User",
  })
  userId: Types.ObjectId;

  @Prop({
    type: Number,
  })
  totalAmount: number;
}

const ordersSchema = SchemaFactory.createForClass(Orders);

export default ordersSchema;
export { OrdersDocument, Orders };
