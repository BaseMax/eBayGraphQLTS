import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Types } from "mongoose";

type NotificationDocument = HydratedDocument<Notification>;

@Schema({
  validateBeforeSave: false,
  timestamps: {
    createdAt: true,
  },
})
class Notification extends Document {
  @Prop({
    type: String,
  })
  content: string;

  @Prop({
    type: Types.ObjectId,
    ref: "User",
  })
  userId: string;

  @Prop({
    type: Boolean,
  })
  isread: boolean;

  @Prop({
    type: String,
  })
  title: string;
}

const notificationSchema = SchemaFactory.createForClass(Notification);

export default notificationSchema;
export { NotificationDocument, Notification };
