import { Inject, Injectable } from "@nestjs/common";
import PushNotifications from "@pusher/push-notifications-server";
import { WebNotificationDTO } from "./schema/WebNotification.dto";

@Injectable()
export class BeamsService {
    constructor(
       @Inject("BeamsProvider") private beamClient: PushNotifications
    ) {}

    async sendNotification(userIds: string[], notification: WebNotificationDTO): Promise<string> {
        const res = await this.beamClient.publishToUsers(userIds, {
            web: notification
        })

        return res.publishId
    }
}