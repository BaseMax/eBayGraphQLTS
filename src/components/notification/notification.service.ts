import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Notification } from "../../models/notification.model";

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notifModel: Model<Notification>,
  ) {}

  private generateMongoId(i: string) {
    return new mongoose.Types.ObjectId(i);
  }

  public async getNotifications(userId: string) {
    return await this.notifModel.findOne(
      { userId: this.generateMongoId(userId) },
      {},
      { populate: { path: "userId" } },
    );
  }

  public async getUnreadNotificationCount() {
    const unreadNotificationCount = await this.notifModel
      .find({ isread: false })
      .count();
    return {
      count: unreadNotificationCount,
    };
  }

  public async markNotificationAsRead(userId: string, notifId: string) {
    return await this.notifModel.findOneAndUpdate(
      {
        userId: this.generateMongoId(userId),
        _id: this.generateMongoId(notifId),
      },
      { $set: { isread: true } },
      { populate: { path: "userId" }, returnOriginal: false },
    );
  }

  public async markAllNotificationsAsRead(userId: string) {
    return await this.notifModel.findOneAndUpdate(
      {
        userId: this.generateMongoId(userId),
      },
      { $set: { isread: true } },
      { populate: { path: "userId" }, returnOriginal: false },
    );
  }
}
