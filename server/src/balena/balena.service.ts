import { Injectable } from '@nestjs/common';
import { BalenaUtils } from './balena.utils';
import { BalenaDevice, BalenaDeviceEnvVar } from './schema/balena.schema';

@Injectable()
export class BalenaService {
  public constructor(private balenaUtils: BalenaUtils) {}

  public async getRouters(): Promise<BalenaDevice[]> {
    return await this.balenaUtils.getRouters()
  }

  public async getRouterByUuid(uuid: string): Promise<BalenaDevice> {
    const device = await this.balenaUtils.getByUuid(uuid)
    const env = await this.balenaUtils.getEnvVar(device.id)
    return {...device, env}
  }

  public async getEnvVarByDeviceId(id: string): Promise<BalenaDeviceEnvVar[]> {
    return await this.balenaUtils.getEnvVar(id)
  }

  public async setEnvVarByUuid(uuid: string, key: string, value: string) {
    const device = await this.getRouterByUuid(uuid)
    return await this.balenaUtils.setEnvVar(device.id, key, value)
  }

  public async delEnvVarByUuid(variableId: string) {
    return await this.balenaUtils.delEnvVar(variableId)
  }
}
