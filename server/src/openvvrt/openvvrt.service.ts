import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import axios, { AxiosError, Method } from "axios";

@Injectable()
export class OpenVVRTService {
    public async request(
        id: string,
        route: Url,
        method: Method,
        content?: []
    ) {
        let url = `https://${id}.openvivi.com/${route}`
        if (method === "GET" && content?.length)
            url += `?${content.join('&')}`

        try {
            await axios({
                url,
                method,
                data: method !== "GET" ? content : undefined
            })
        } catch (e) {
            const err = e as AxiosError
            switch (err.response.status) {
                case 400:
                    throw new BadRequestException()
                case 403:
                    throw new UnauthorizedException("Permission denied")
                case 404:
                    throw new ForbiddenException("Targeted ressource does not exists")
                case 500:
                    throw new InternalServerErrorException(err.message)
            }
        }
    }
}

export enum Url {
    Cpu = 'system/cpu',
    Ram = 'system/ram',
    Storage = 'systemstorage/',
    Uptime = 'system/uptime',
    Reboot = 'system/reboot',
    Poweroff = 'system/poweroff',
    Logs = 'service/logs',
    Build = 'service/build',
    Start = 'service/start',
    Stop = 'service/stop',
    Restart = 'service/restart'
}