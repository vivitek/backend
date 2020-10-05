import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as request from "supertest"
import { AppModule } from "../app.module"
import { UsersService } from "./users.service"
import { LoginDto, RegisterDto, UpdateUserDto } from "../auth/auth.dto"
import { User } from "./schemas/users.schema"

describe('Users Controller', () => {
  const url: string = "/users"
  let service: UsersService
  let server: any;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO = "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    service = module.get<UsersService>(UsersService)
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
    const created = toe2eDTO(await service.createUser(
        ToCreateUser.email,
        ToCreateUser.password,
        ToCreateUser.username
    ))
    const res = await request(server).get(`${url}/${created._id}`)
    expect(res.status).toBe(200)
    expect(res.body.email).toBe(ToCreateUser.email)
    expect(res.body.password).toBeUndefined()
    expect(res.body.username).toBe(ToCreateUser.username)
  })

  it('[DELETE] /:id', async () => {
    const created = toe2eDTO(await service.createUser(
        ToCreateUser.email,
        ToCreateUser.password,
        ToCreateUser.username
    ))
    const removed = await request(server).delete(`${url}/${created._id}`)
    expect(removed.status).toBe(200)
    expect(removed.body.email).toBe(ToCreateUser.email)
    expect(removed.body.password).toBeUndefined()
    expect(removed.body.username).toBe(ToCreateUser.username)
    const res = await request(server).delete(`${url}/${created._id}`)
    expect(res.body).toStrictEqual({})
  })

  it('[PATCH] /:id', async() => {
    const created = toe2eDTO(await service.createUser(
        ToCreateUser.email,
        ToCreateUser.password,
        ToCreateUser.username
    ))
    const edited = await request(server).patch(`${url}/${created._id}`).send(editedUserCredentials)
    expect(edited.status).toBe(200)
    expect(edited.body._id.toString()).toBe(created._id.toString())
    expect(edited.body.email).toBe(editedUserCredentials.email)
    expect(edited.body.password).toBeUndefined()
  })

  afterEach(async () => {
    await service.deleteAll()
    await app.close()
  })
})

function toe2eDTO(data: User) {
    return !data ? null : {
        _id: data._id,
        email: data.email,
        passwordHash: data.password,
        username: data.username
    }
}

const userCredentials: LoginDto = {
    email: "john.doe@vincipit.com",
    password: "s3cur3dp@ssw0rd",
}

const ToCreateUser: RegisterDto = {
    ...userCredentials,
    username: "xXx_John_Doe_xXx"
}

const editedUserCredentials: UpdateUserDto = {
  email: "john@doe.com",
  password: "v3rys3cur3dp@ssw0rd",
  username: "John"
}
