import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as request from "supertest"
import { AppModule } from "../app.module"
import { ServiceService } from "./service.service"
import { ServiceCreation, ServiceDTO, ServiceUpdate } from "./schemas/service.dto"

describe('Service Controller', () => {
  const url = "/service"
  let service: ServiceService
  let server: any;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO = "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    service = module.get<ServiceService>(ServiceService)
    server = app.getHttpServer()
    await app.init()
  })

  it('Should be defined', () => {
    expect(module).toBeDefined()
    expect(app).toBeDefined()
    expect(service).toBeDefined()
    expect(server).toBeDefined()
  })
/*
  it('[GET] /', async () => {
   const res = await request(server).get(url)
   expect(res.status).toBe(200)
   expect(res.body.length).toBe(0)
  })

  it('[GET] /:id', async () => {
    const created: ServiceDTO = await service.create(ToCreateService)
    const res = await request(server).get(`${url}/${created._id}`)
    expect(res.status).toBe(200)
    expect(res.body.displayName).toBe(ToCreateService.displayName)
    expect(res.body.name).toBe(ToCreateService.name)
    expect(res.body.bandwidth).toBe(ToCreateService.bandwidth)
    expect(res.body.tags).toStrictEqual(ToCreateService.tags)
    expect(res.body.ips).toStrictEqual(ToCreateService.ips)
  })

  it('[POST] /', async () => {
    const res = await request(server).post(url).send(ToCreateService)
    expect(res.status).toBe(201)
    expect(res.body._id).toBeDefined()
    expect(res.body.displayName).toBe(ToCreateService.displayName)
    expect(res.body.name).toBe(ToCreateService.name)
    expect(res.body.bandwidth).toBe(ToCreateService.bandwidth)
    expect(res.body.tags).toStrictEqual(ToCreateService.tags)
    expect(res.body.ips).toStrictEqual(ToCreateService.ips)
  })

  it('[DELETE] /:id', async () => {
    const created: ServiceDTO = await service.create(ToCreateService)
    const removed = await request(server).delete(`${url}/${created._id}`)
    expect(removed.status).toBe(200)
    expect(removed.body._id.toString()).toBe(created._id.toString())
    const res = await service.findById(created._id)
    expect(res).toBeNull()

  })

  it('[PATCH] /:id', async() => {
    const created: ServiceDTO = await service.create(ToCreateService)
    const edited = await request(server).patch(`${url}/${created._id}`).send(editedService)
    expect(edited.status).toBe(200)
    expect(edited.body._id.toString()).toBe(created._id.toString())
    expect(edited.body.displayName).toBe(editedService.displayName)
    expect(edited.body.name).toBe(editedService.name)
    expect(edited.body.bandwidth).toBe(editedService.bandwidth)
    expect(edited.body.tags).toStrictEqual(editedService.tags)
    expect(edited.body.ips).toStrictEqual(editedService.ips)
  })*/

  afterEach(async () => {
    await service.deleteAll()
    await app.close()
  })
})

const ToCreateService: ServiceCreation = {
    displayName: "irony",
    name: "garlic",
    bandwidth: 10,
    tags: [],
    ips: []
}

const editedService: ServiceUpdate = {
    displayName: "sulphur",
    name: "warm",
    bandwidth: 100,
    tags: [],
    ips: []
}
