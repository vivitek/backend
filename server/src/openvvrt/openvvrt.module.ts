import { Module } from "@nestjs/common"
import { OpenVVRTResolver } from "./openvvrt.resolver"
import { OpenVVRTService } from "./openvvrt.service"

@Module({
    providers: [OpenVVRTResolver, OpenVVRTService]
})
export class OpenVVRTModule {}