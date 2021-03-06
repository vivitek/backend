import { INestApplication } from "@nestjs/common"
import { AppModule } from "../app.module"
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserUpdateInput } from "./schemas/users.input";

describe('UsersService', () => {
  let service: UsersService;
  let resolver: UsersResolver;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO= "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication();
    service = module.get<UsersService>(UsersService);
    resolver = module.get<UsersResolver>(UsersResolver);
    await app.init();
  });

  afterEach(async () => {
    await resolver.getUsers().then((users) => {
      users.forEach(async user => {
        await resolver.deleteUser(user._id.toString())
      })
    })
    await app.close();
  });

  const user = {
    email: 'test@testing.com',
    password: 'password',
    username: 'username',
  }
  const anotherUser = {
    email: 'another-test@testing.com',
    password: 'password',
    username: 'anotherUsername',
  }

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(service).toBeDefined();
    expect(resolver).toBeDefined();
  });

  it('getUsers work', async () => {
    const value = await resolver.createUser(user);
    const anotherValue = await resolver.createUser(anotherUser);
    const result = await resolver.getUsers();

    expect(value.email).toEqual(result[0].email);
    expect(value.username).toEqual(result[0].username);
    expect(anotherValue.email).toEqual(result[1].email);
    expect(anotherValue.username).toEqual(result[1].username);
  });

  it('getUser work', async () => {
    const value = await resolver.createUser(user);
    const result = await resolver.getUser(value._id.toString());

    expect(value._id.toString()).toEqual(result._id.toString());
    expect(value.email).toEqual(result.email);
    expect(value.username).toEqual(result.username);
  });

  it('deleteUser work', async () => {
    const value = await resolver.createUser(user);
    await resolver.deleteUser(value._id.toString());

    expect(await resolver.getUser(value._id.toString())).toEqual(null);
  });

  it('updateUser work', async () => {
    const value = await resolver.createUser(user);
    const payload: UserUpdateInput = {
      _id: value._id.toString(),
      username: 'anotherUsername',
      email: 'anotherEmail',
    }
    const result = await resolver.updateUser(payload);

    expect(payload._id).toEqual(result._id.toString());
    expect(payload.email).toEqual(result.email);
    expect(payload.username).toEqual(result.username);
    expect(value.password).toEqual(result.password);
  });

  it('createUser work', async () => {
    const result = await resolver.createUser(user);

    expect(user.email).toEqual(result.email);
    expect(user.username).toEqual(result.username);
  });
});
