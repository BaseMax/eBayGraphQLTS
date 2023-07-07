import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Types } from "mongoose";

type BidsDocument = HydratedDocument<Bids>;

interface IbidsSchema {
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
class Bids extends Document {
  @Prop({
    type: Number,
    default: 0,
    required: true,
  })
  amount: number;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: "Product",
  })
  product: Types.ObjectId;
}

const bidsSchema = SchemaFactory.createForClass(Bids);

export default bidsSchema;
export { BidsDocument, Bids, IbidsSchema };
