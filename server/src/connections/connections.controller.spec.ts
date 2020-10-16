import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { AppModule } from "../app.module"
import { ConnectionsService } from "./connections.service"
import { ConnectionDto } from "./schemas/connection.dto"

describe('Connection Controller', () => {
  let service: ConnectionsService
  let server: any;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO = "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    service = module.get<ConnectionsService>(ConnectionsService)
    server = app.getHttpServer()
    await app.init()
  })

  it('Should be defined', () => {
    expect(module).toBeDefined()
    expect(app).toBeDefined()
    expect(service).toBeDefined()
    expect(server).toBeDefined()
  })

  it('DTO', async () => {
      const d = new ConnectionDto(toCreateDto)
      expect(d.routerId).toBe(toCreateDto.routerId)
      expect(d.treated).toBe(toCreateDto.treated)
      expect(d.address).toBe(toCreateDto.address)
      expect(d.createdAt).toBe(toCreateDto.createdAt)
      expect(d.data).toBe(toCreateDto.data)
  })

  afterEach(async () => {
    await app.close()
  })
})

const toCreateDto = {
    routerId: "42",
    treated: true,
    address: "ff:ff:ff:ff:ff",
    createdAt: new Date(),
    data: "wave-top-pen"
}