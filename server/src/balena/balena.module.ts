import { Module } from '@nestjs/common';
import { BalenaDeviceResolver } from './balena.resolver';
import { BalenaService } from './balena.service';
import { BalenaUtils } from './balena.utils';

@Module({
  providers: [BalenaService, BalenaUtils, BalenaDeviceResolver],
  exports: [BalenaService],
})
export class BalenaModule {}
