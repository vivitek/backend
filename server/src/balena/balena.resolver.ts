import { Logger, NotAcceptableException, UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { AuthGuard } from "../auth/auth.guard";
import { BalenaService } from "./balena.service";
import { BalenaDevice, BalenaDeviceEnvVar } from "./schema/balena.schema";


@Resolver(() => BalenaDevice)
@UseGuards(new AuthGuard())
export class BalenaDeviceResolver {
  private readonly logger;

  constructor(private service: BalenaService) {
    this.logger = new Logger('BalenaResolver')
  }

  @Query(() => [BalenaDevice])
  public async getBalenaDevices() {
    this.logger.log('Getting Balena devices')
    return await this.service.getRouters()
  }

  @Query(() => BalenaDevice, {nullable: true})
  public async getBalenaDeviceByUuid(@Args('uuid') uuid: string) {
    this.logger.log(`Getting router ${uuid}`)
    return await this.service.getRouterByUuid(uuid)
  }

  @Query(() => [BalenaDeviceEnvVar])
  public async getEnvVarByDeviceId(@Args("deviceId") deviceId: string) {
    this.logger.log(`Getting env var for device ${deviceId}`)
    return await this.service.getEnvVarByDeviceId(deviceId)
  }

  @Mutation(() => BalenaDeviceEnvVar)
  public async setEnvVarOnBalenaDevice(
    @Args('uuid') uuid: string,
    @Args('key') key: string,
    @Args('value') value: string
  ) {
    this.logger.log(`Setting ${key}=${value} on device ${uuid}`)
    return await this.service.setEnvVarByUuid(uuid, key, value)
  }

  @Mutation(() => String)
  public async delEnvVarOnBalenaDevice(
    @Args('id') id: string
  ) {
    this.logger.log(`Removing environment variable ${id}`)
    try {
      await this.service.delEnvVarByUuid(id)
      return "OK"
    } catch {
      return "KO"
    }
  }

}
