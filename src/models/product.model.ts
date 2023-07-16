import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Types } from "mongoose";

type ProductDocument = HydratedDocument<Product>;

interface IproductSchema {
  title: string;
  price: number;
  description: string;
}

@Schema({
  validateBeforeSave: false,
  timestamps: {
    createdAt: true,
  },
})
class Product extends Document {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;
  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: "User",
  })
  seller: string;

  @Prop({
    type: Number,
  })
  view: number;

  @Prop({
    type: Boolean,
    default: true,
  })
  isfeatured: boolean;
}

const productSchema = SchemaFactory.createForClass(Product);

export default productSchema;
export { ProductDocument, Product, IproductSchema };
