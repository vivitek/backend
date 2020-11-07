import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { Service } from "../service/schemas/service.schema"
import * as request from "supertest"
import { AppModule } from "../app.module"
import { ConfigService } from "./config.service"
import { ConfigCreation, ConfigDTO, ConfigUpdate } from "./schemas/config.dto"

describe('Config Controller', () => {
  const url = "/config"
  let service: ConfigService
  let server: any;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO = "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    service = module.get<ConfigService>(ConfigService)
    server = app.getHttpServer()
    await app.init()
  })

  it('Should be defined', () => {
    expect(module).toBeDefined()
    expect(app).toBeDefined()
    expect(service).toBeDefined()
    expect(server).toBeDefined()
  })

  it('[GET] /', async () => {
   const res = await request(server).get(url)
   expect(res.status).toBe(200)
   expect(res.body.length).toBe(0)
  })

  it('[GET] /:id', async () => {
    const created: ConfigDTO = await service.create(ToCreateConfig)
    const res = await request(server).get(`${url}/${created._id}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(ToCreateConfig.name)
    expect(res.body.services).toStrictEqual(ToCreateConfig.services)
  })

  it('[POST] /', async () => {
    const res = await request(server).post(url).send(ToCreateConfig)
    expect(res.status).toBe(201)
    expect(res.body._id).toBeDefined()
    expect(res.body.name).toBe(ToCreateConfig.name)
    expect(res.body.services).toStrictEqual(ToCreateConfig.services)
  })

  it('[DELETE] /:id', async () => {
    const created: ConfigDTO = await service.create(ToCreateConfig)
    const removed = await request(server).delete(`${url}/${created._id}`)
    expect(removed.status).toBe(200)
    expect(removed.body._id.toString()).toBe(created._id.toString())
    const res = await service.findById(created._id)
    expect(res).toBeNull()

  })

  it('[PATCH] /:id', async() => {
    const created: ConfigDTO = await service.create(ToCreateConfig)
    const edited = await request(server).patch(`${url}/${created._id}`).send(editedConfig)
    expect(edited.status).toBe(200)
    expect(edited.body._id.toString()).toBe(created._id.toString())
    expect(edited.body.name).toStrictEqual(editedConfig.name)
    expect(edited.body.services).toStrictEqual(editedConfig.services)
  })

  afterEach(async () => {
    await service.deleteAll()
    await app.close()
  })
})

const ToCreateConfig: ConfigCreation = {
    name: "lan",
    services: []
}

const editedConfig: ConfigUpdate = {
    name: "meetings",
    services: [
        {
        displayName: "social networks",
        name: "IGTV",
        bandwidth: 10,
        tags: []
        } as Service
    ]
}
