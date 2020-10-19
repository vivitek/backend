import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as request from "supertest"
import { AppModule } from "../app.module"
import { BanService } from "./ban.service"
import { BanCreation, BanDTO, BanUpdate } from "./schemas/ban.dto"

describe('Ban Controller', () => {
  const url = "/ban"
  let service: BanService
  let server: any;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO = "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    service = module.get<BanService>(BanService)
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
    const created: BanDTO = await service.create(toCreateBan)
    const res = await request(server).get(`${url}/${created._id}`)
    expect(res.status).toBe(200)
    expect(res.body.address).toBe(toCreateBan.address)
    expect(res.body.banned).toBe(toCreateBan.banned)
    expect(res.body.routerSet).toBe(toCreateBan.routerSet)
  })

  it('[POST] /', async () => {
    const res = await request(server).post(url).send(toCreateBan)
    expect(res.status).toBe(201)
    expect(res.body._id).toBeDefined()
    expect(res.body.address).toBe(toCreateBan.address)
    expect(res.body.banned).toBe(toCreateBan.banned)
    expect(res.body.routerSet).toBe(toCreateBan.routerSet)
  })

  it('[DELETE] /:id', async () => {
    const created: BanDTO = await service.create(toCreateBan)
    const removed = await request(server).delete(`${url}/${created._id}`)
    expect(removed.status).toBe(200)
    expect(removed.body._id.toString()).toBe(created._id.toString())
    const res = await service.findById(created._id)
    expect(res).toBeNull()

  })

  it('[PATCH] /:id', async() => {
    const created: BanDTO = await service.create(toCreateBan)
    const edited = await request(server).patch(`${url}/${created._id}`).send(editedBan)
    expect(edited.status).toBe(200)
    expect(edited.body._id.toString()).toBe(created._id.toString())
    expect(edited.body.address).toBe(editedBan.address)
    expect(edited.body.banned).toBe(editedBan.banned)
    expect(edited.body.routerSet).toBe(editedBan.routerSet)
  })

  afterEach(async () => {
    await service.deleteAll()
    await app.close()
  })
})

const toCreateBan: BanCreation = {
  address: "vincipit.com",
  banned: true,
  routerSet: "0"
}

const editedBan: BanUpdate = {
  address: "ransomware.be",
  banned: false,
  routerSet: "1"
}
