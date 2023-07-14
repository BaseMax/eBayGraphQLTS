import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Types } from "mongoose";

type CategoryDocument = HydratedDocument<Category>;

@Schema({
  validateBeforeSave: false,
  timestamps: {
    createdAt: true,
  },
})
class Category extends Document {
  @Prop({
    type: String,
    required: false,
  })
  name: string;

  @Prop({
    type: String,
    ref: "Category",
    default: null,
  })
  subCategory: Types.ObjectId;
}

const categorySchema = SchemaFactory.createForClass(Category);

export default categorySchema;
export { CategoryDocument, Category };
