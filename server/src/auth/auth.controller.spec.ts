import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { UsersService } from "../users/users.service"
import * as request from "supertest"
import { AppModule } from "../app.module"
import { LoginDto, RegisterDto } from "./auth.dto"
import { AuthService } from "./auth.service"

describe('Auth Controller', () => {
  const url: string = "/auth"
  let service: AuthService
  let usersService: UsersService
  let server: any;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO = "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    service = module.get<AuthService>(AuthService)
    usersService = module.get<UsersService>(UsersService)
    server = app.getHttpServer()
    await app.init()
  })

  it('Should be defined', () => {
    expect(module).toBeDefined()
    expect(app).toBeDefined()
    expect(service).toBeDefined()
    expect(server).toBeDefined()
  })

  it('[POST][Existing user] /login', async () => {
    await usersService.createUser(
      toCreateUser.email,
      toCreateUser.password,
      toCreateUser.username
    )
    const res = await request(server).post(`${url}/login`).send(userCredentials)
    expect(res.status).toBe(201)
    expect(res.body.access_token).toBeDefined()
  })

  it('[POST][Non existing user] /login', async () => {
    const res = await request(server).post(`${url}/login`).send(nonExistingUser)
    expect(res.status).toBe(201)
    expect(res.body).toStrictEqual({})
  })

  it('[POST][Empty body] /login', async () => {
    const res = await request(server).post(`${url}/login`)
    expect(res.status).toBe(201)
    expect(res.body).toStrictEqual({})
  })

  it('[POST] /register', async () => {
    const res = await request(server).post(`${url}/register`).send(toCreateUser)
    expect(res.status).toBe(201)
    expect(res.body.access_token).toBeDefined()
  })

  it('[POST][Empty body] /register', async () => {
    const res = await request(server).post(`${url}/register`)
    expect(res.status).toBe(400)
  })

  afterEach(async () => {
    await usersService.deleteAll()
    await app.close()
  })
})

function getUniqueValue(): string {
  return new Date().getUTCMilliseconds().toString()
}

const userCredentials: LoginDto = {
  email: "john.doe@vincipit.com",
  password: "s3cur3dp@ssw0rd"
}

const toCreateUser: RegisterDto = {
  ...userCredentials,
  username: "xXx_John_Doe_xXx"
}

const nonExistingUser: LoginDto = {
  email: getUniqueValue(),
  password: "password"
}