import { Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { NotificationResolver } from "./notification.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import notificationSchema, {
  Notification,
} from "../../models/notification.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: notificationSchema },
    ]),
  ],
  providers: [NotificationResolver, NotificationService],
})
export class NotificationModule {}
