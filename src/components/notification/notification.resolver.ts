import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { NotificationService } from "./notification.service";

@Resolver("Notification")
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation("getNotifications")
  public async getNotifications(@Args("userId") userId: string) {
    return await this.notificationService.getNotifications(userId);
  }

  @Mutation("markNotificationAsRead")
  public async markNotificationAsRead(
    @Args("userId") userId: string,
    @Args("notificationId") notifId: string,
  ) {
    return await this.notificationService.markNotificationAsRead(
      userId,
      notifId,
    );
  }

  @Mutation("markAllNotificationsAsRead")
  public async markAllNotificationsAsRead(@Args("userId") userId: string) {
    return await this.notificationService.markAllNotificationsAsRead(userId);
  }

  @Query("getUnreadNotificationCount")
  public async getUnreadNotificationCount() {
    return await this.notificationService.getUnreadNotificationCount();
  }
}
