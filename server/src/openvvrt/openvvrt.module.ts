import { Module } from '@nestjs/common';
import { OpenVVRTResolver } from './openvvrt.resolver';
import { OpenVVRTService } from './openvvrt.service';
@Module({
  providers: [OpenVVRTService, OpenVVRTResolver],
  exports: [OpenVVRTService],
})
export class OpenVVRTModule {}
