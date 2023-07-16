import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { HydratedDocument } from "mongoose";

type UserDocument = HydratedDocument<User>;

interface IuserSchema {
  email: string;
  password: string;
  name: string;
}

@Schema({
  validateBeforeSave: false,
  timestamps: {
    createdAt: true,
  },
})
class User {
  @Prop({
    type: String,
    required: true,
    index: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;
  @Prop({
    type: String,
    required: true,
    index: true,
  })
  name: string;
}

const userSchema = SchemaFactory.createForClass(User);

export default userSchema;
export { UserDocument, User, IuserSchema };
