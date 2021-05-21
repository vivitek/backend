import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class BalenaDevice {
  @Field(() => String)
  id: string

  @Field(() => String)
  device_name: string

  @Field(() => String)
  uuid: string

  @Field(() => String)
  status: string

  @Field(() => Boolean)
  is_online: boolean

  @Field(() => Boolean)
  is_connected_to_vpn: boolean

  @Field(() => String)
  last_connectivity_event: string

  @Field(() => String)
  ip_address: string

  @Field(() => String)
  mac_address: string

  @Field(() => String, {nullable: true})
  vpn_address: string

  @Field(() => String)
  public_address: string

  @Field(() => String)
  os_version: string

  @Field(() => String)
  os_variant: string

  @Field(() => Boolean)
  is_web_accessible: boolean

  @Field(() => String)
  longitude: string

  @Field(() => String)
  latitude: string

  @Field(() => String)
  location: string

  @Field(() => String)
  created_at: string

  @Field(() => Number)
  memory_usage: number

  @Field(() => Number)
  memory_total: number

  @Field(() => Number)
  storage_usage: number

  @Field(() => Number)
  storage_total: number

  @Field(() => Number)
  cpu_temp: number

  @Field(() => Number)
  cpu_usage: number

  @Field(() => [BalenaDeviceEnvVar], {nullable: true})
  env: BalenaDeviceEnvVar[]
}


@ObjectType()
export class BalenaDeviceEnvVar {
  @Field(() => String)
  created_at: string

  @Field(() => String)
  name: string

  @Field(() => String)
  value: string

  @Field(() => Number)
  id: number

  @Field(() => Number)
  device_id: number
}
