import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as request from "supertest"
import { AppModule } from "../app.module"
import { TagService } from "./tag.service"
import { TagCreation, TagDTO, TagUpdate } from "./schemas/tag.dto"

describe('Tag Controller', () => {
  const url: string = "/tag"
  let service: TagService
  let server: any;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO = "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    service = module.get<TagService>(TagService)
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
    const created: TagDTO = await service.create(ToCreateTag)
    const res = await request(server).get(`${url}/${created._id}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(ToCreateTag.name)
  })

  it('[POST] /', async () => {
    const res = await request(server).post(url).send(ToCreateTag)
    expect(res.status).toBe(201)
    expect(res.body._id).toBeDefined()
    expect(res.body.name).toBe(ToCreateTag.name)
  })

  it('[DELETE] /:id', async () => {
    const created: TagDTO = await service.create(ToCreateTag)
    const removed = await request(server).delete(`${url}/${created._id}`)
    expect(removed.status).toBe(200)
    expect(removed.body._id.toString()).toBe(created._id.toString())
    const res = await service.findById(created._id)
    expect(res).toBeNull()

  })

  it('[PATCH] /:id', async() => {
    const created: TagDTO = await service.create(ToCreateTag)
    const edited = await request(server).patch(`${url}/${created._id}`).send(editedTag)
    expect(edited.status).toBe(200)
    expect(edited.body._id.toString()).toBe(created._id.toString())
    expect(edited.body.name).toBe(editedTag.name)
  })

  afterEach(async () => {
    await service.deleteAll()
    await app.close()
  })
})

const ToCreateTag: TagCreation = {
    name: "social network"
}

const editedTag: TagUpdate = {
    name: "streaming"
}
