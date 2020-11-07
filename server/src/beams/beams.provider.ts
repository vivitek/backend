import PushNotifications from "@pusher/push-notifications-server";
const ClientMaker = require('@pusher/push-notifications-server');


export const beamsProviders = [
	{
		provide: "BeamsProvider",
		useFactory: (): PushNotifications => {
            const client = new ClientMaker({
                secretKey: process.env.BEAMS_SECRET,
                instanceId: "6427b78a-033d-4139-aa97-2b91448d0cad"
            })
            return client
		}
	}
]