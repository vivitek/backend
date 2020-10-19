import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as request from "supertest"
import { AppModule } from "../app.module"
import { IpService } from "./ip.service"
import { IpCreation, IpDTO, IpUpdate } from "./schemas/ip.dto"

describe('Ip Controller', () => {
  const url = "/ip"
  let service: IpService
  let server: any;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO = "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    service = module.get<IpService>(IpService)
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
    const created: IpDTO = await service.create(ToCreateIp)
    const res = await request(server).get(`${url}/${created._id}`)
    expect(res.status).toBe(200)
    expect(res.body.v4ip).toBe(ToCreateIp.v4ip)
    expect(res.body.v6ip).toBe(ToCreateIp.v6ip)
  })

  it('[POST] /', async () => {
    const res = await request(server).post(url).send(ToCreateIp)
    expect(res.status).toBe(201)
    expect(res.body._id).toBeDefined()
    expect(res.body.v4ip).toBe(ToCreateIp.v4ip)
    expect(res.body.v6ip).toBe(ToCreateIp.v6ip)
  })

  it('[DELETE] /:id', async () => {
    const created: IpDTO = await service.create(ToCreateIp)
    const removed = await request(server).delete(`${url}/${created._id}`)
    expect(removed.status).toBe(200)
    expect(removed.body._id.toString()).toBe(created._id.toString())
    const res = await service.findById(created._id)
    expect(res).toBeNull()

  })

  it('[PATCH] /:id', async() => {
    const created: IpDTO = await service.create(ToCreateIp)
    const edited = await request(server).patch(`${url}/${created._id}`).send(editedIp)
    expect(edited.status).toBe(200)
    expect(edited.body._id.toString()).toBe(created._id.toString())
    expect(edited.body.v4ip).toBe(editedIp.v4ip)
    expect(edited.body.v6ip).toBe(editedIp.v6ip)
  })

  afterEach(async () => {
    await service.deleteAll()
    await app.close()
  })
})

const ToCreateIp: IpCreation = {
  v4ip: "0.0.0.0.0",
  v6ip: "hidden"
}

const editedIp: IpUpdate = {
  v4ip: "192.168.1.1",
  v6ip: "unknown"
}
