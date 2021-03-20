import { Module } from '@nestjs/common';
import { BalenaService } from './balena.service';

@Module({
  providers: [BalenaService],
  exports: [BalenaService],
})
export class BalenaModule {}
