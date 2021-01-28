/*import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as request from "supertest"
import { AppModule } from "../app.module"
import { TemplateService } from "./template.service"
import { TemplateCreation, TemplateDTO, TemplateUpdate } from "./schemas/template.dto"
import { User } from "../users/schemas/users.schema"
import { Ban } from "../ban/schemas/ban.schema"
import { Service } from "../service/schemas/service.schema"

describe('Template Controller', () => {
  const url = "/template"
  let service: TemplateService
  let server: any;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO = "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    service = module.get<TemplateService>(TemplateService)
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
    const created: TemplateDTO = await service.create(ToCreateTemplate)
    const res = await request(server).get(`${url}/${created._id}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(ToCreateTemplate.name)
    expect(res.body.author).toBe(ToCreateTemplate.author)
    expect(res.body.hosts).toStrictEqual(ToCreateTemplate.hosts)
    expect(res.body.services).toStrictEqual(ToCreateTemplate.services)
  })

  it('[POST] /', async () => {
    const res = await request(server).post(url).send(ToCreateTemplate)
    expect(res.status).toBe(201)
    expect(res.body._id).toBeDefined()
    expect(res.body.name).toBe(ToCreateTemplate.name)
    expect(res.body.author).toBe(ToCreateTemplate.author)
    expect(res.body.hosts).toStrictEqual(ToCreateTemplate.hosts)
    expect(res.body.services).toStrictEqual(ToCreateTemplate.services)
  })

  it('[DELETE] /:id', async () => {
    const created: TemplateDTO = await service.create(ToCreateTemplate)
    const removed = await request(server).delete(`${url}/${created._id}`)
    expect(removed.status).toBe(200)
    expect(removed.body._id.toString()).toBe(created._id.toString())
    const res = await service.findById(created._id)
    expect(res).toBeNull()

  })

  it('[PATCH] /:id', async() => {
    const created: TemplateDTO = await service.create(ToCreateTemplate)
    const edited = await request(server).patch(`${url}/${created._id}`).send(editedTemplate)
    expect(edited.status).toBe(200)
    expect(edited.body._id.toString()).toBe(created._id.toString())
    expect(edited.body.name).toBe(editedTemplate.name)
    expect(edited.body.author).toStrictEqual(editedTemplate.author)
    expect(edited.body.hosts).toStrictEqual(editedTemplate.hosts)
    expect(edited.body.services).toStrictEqual(editedTemplate.services)
  })

  afterEach(async () => {
    await service.deleteAll()
    await app.close()
  })
})

const ToCreateTemplate: TemplateCreation = {
    name: "social media",
    author: undefined,
    hosts: [],
    services: []
}

const editedTemplate: TemplateUpdate = {
    name: "streaming",
    author: {} as User,
    hosts: [{
      banRef: {} as Ban,
      banned: false
    }],
    services: [{
      serviceRef: {} as Service,
      banned: true
    }]
}*/