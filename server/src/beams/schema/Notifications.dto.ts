import { ApnsPayload } from "@pusher/push-notifications-server";
import { WebNotificationDTO } from "./WebNotification.dto";

export class NotificationDTO {
    userIds: [string]
    web ?: WebNotificationDTO
}