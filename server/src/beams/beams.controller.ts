import { Body, Controller, Inject, Get, Query, Post } from "@nestjs/common";
import PushNotifications from "@pusher/push-notifications-server";
import { UsersService } from "../users/users.service";
import { BeamsService } from "./beams.service";
import { NotificationDTO } from "./schema/Notifications.dto";
import { WebNotificationDTO } from "./schema/WebNotification.dto";

@Controller('beams')
export class BeamsController {
    constructor(
       @Inject("BeamsProvider") private beamsClient: PushNotifications,
       private userService: UsersService,
       private beamService: BeamsService
       ) {}

    @Get("/token")
    async genToken(@Query("userId") userId: string ) {
        const user = await this.userService.findById(userId)
        return this.beamsClient.generateToken(`${user._id}`)
    }

    @Post("/send")
    async sendNotification(@Body() notification: NotificationDTO) {
        return await this.beamService.sendNotification(notification.userIds, notification.web)
    }
}