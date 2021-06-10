export class WebNotificationDTO {
    notification: {
        title: string,
        body: string,
        icon?: string,
        deep_link?: string,
        hide_notification_if_site_has_focus?: string
    }
    data: Record<string, unknown>
}