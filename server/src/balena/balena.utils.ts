import axios, { AxiosInstance } from "axios"
import { BalenaDevice, BalenaDeviceEnvVar } from "./schema/balena.schema"

export class BalenaUtils {
  private client: AxiosInstance

  public constructor() {
    this.client = axios.create({
      baseURL: "https://api.balena-cloud.com",
      headers: {
        "Authorization": `Bearer ${process.env.BALENA_API_KEY}`,
        "Content-Type": "Application/json"
      }
    })
  }

  public async getRouters(): Promise<BalenaDevice[]> {
    const res = await this.client.get('/v6/device')
    return res.data.d as BalenaDevice[]
  }

  public async getByUuid(uuid: string): Promise<BalenaDevice> {
    const d =  await this.client.get(`/v6/device?$filter=uuid%20eq%20'${uuid}'`)
    return d.data.d[0] as BalenaDevice
  }

  public async getEnvVar(id: string): Promise<BalenaDeviceEnvVar[]> {
    const res = await this.client.get(`/v6/device_environment_variable?$filter=device%20eq%20'${id}'`)
    return res.data.d.map(_var => this.toEnvVar(_var))
  }

  public async setEnvVar(id: string, key: string, value: string): Promise<BalenaDeviceEnvVar> {
    const res = await this.client.post('/v6/device_environment_variable', {
      device: id,
      name: key,
      value
    })
    return this.toEnvVar(res.data)
  }

  public async delEnvVar(id: string): Promise<void> {
    await this.client.delete(`/v6/device_environment_variable(${id})`)
  }

  private toEnvVar(d): BalenaDeviceEnvVar {
    return {
      created_at: d.created_at,
      name: d.name,
      value: d.value,
      id: d.id,
      device_id: d.device.__id
    }
  }
}
