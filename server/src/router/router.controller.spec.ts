import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as request from "supertest"
import { AppModule } from "../app.module"
import { RouterService } from "./router.service"
import { RouterCreation, RouterDTO, RouterUpdate } from "./schemas/router.dto"

describe('Router Controller', () => {
  const url = "/router"
  let service: RouterService
  let server: any;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO = "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    service = module.get<RouterService>(RouterService)
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
    const created: RouterDTO = await service.create(ToCreateRouter)
    const res = await request(server).get(`${url}/${created._id}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(ToCreateRouter.name)
    expect(res.body.url).toBe(ToCreateRouter.url)
  })

  it('[POST] /', async () => {
    const res = await request(server).post(url).send(ToCreateRouter)
    expect(res.status).toBe(201)
    expect(res.body._id).toBeDefined()
    expect(res.body.name).toBe(ToCreateRouter.name)
    expect(res.body.url).toBe(ToCreateRouter.url)
  })

  it('[DELETE] /:id', async () => {
    const created: RouterDTO = await service.create(ToCreateRouter)
    const removed = await request(server).delete(`${url}/${created._id}`)
    expect(removed.status).toBe(200)
    expect(removed.body._id.toString()).toBe(created._id.toString())
    const res = await service.findById(created._id)
    expect(res).toBeNull()

  })

  it('[PATCH] /:id', async() => {
    const created: RouterDTO = await service.create(ToCreateRouter)
    const edited = await request(server).patch(`${url}/${created._id}`).send(editedRouter)
    expect(edited.status).toBe(200)
    expect(edited.body._id.toString()).toBe(created._id.toString())
    expect(edited.body.name).toBe(editedRouter.name)
    expect(edited.body.url).toBe(editedRouter.url)
  })

  afterEach(async () => {
    await service.deleteAll()
    await app.close()
  })
})

const ToCreateRouter: RouterCreation = {
    name: "foo",
    url:"127.0.0.1"
}

const editedRouter: RouterUpdate = {
    name: "bar",
    url: "192.168.1.1"
}
