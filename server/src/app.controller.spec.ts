import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as request from "supertest"
import { AppModule } from "./app.module"
import { AppService } from "./app.service"

describe('Ip Controller', () => {
  const url: string = "/"
  let service: AppService
  let server: any;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO = "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    service = module.get<AppService>(AppService)
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
   expect(res.text).toBe('Hello World!')
  })

  afterEach(async (done) => {
    done()
  })
})
