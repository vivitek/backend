import { INestApplication } from "@nestjs/common"
import { AppModule } from "../app.module"
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { UserUpdateInput } from "./schemas/users.input";

describe('UsersService', () => {
  let service: UsersService;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO= "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication();    
    service = module.get<UsersService>(UsersService);
    await app.init();
  });

  afterEach(async () => {
    await service.findAll().then((users) => {
      users.forEach(async user => {
        await service.deleteById(user._id.toString())
      })
    })
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(service).toBeDefined();
  });

  it('findAll work', async () => {
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
    const value = await service.createUser(user);
    const anotherValue = await service.createUser(anotherUser);

    const result = await service.findAll();

    expect(value.email).toEqual(result[0].email);
    expect(value.username).toEqual(result[0].username);
    expect(anotherValue.email).toEqual(result[1].email);
    expect(anotherValue.username).toEqual(result[1].username);
  });

  it('findByEmail work', async () => {
    const user = {
      email: 'test@testing.com',
      password: 'password',
      username: 'username',
    }
    const value = await service.createUser(user);
    
    const result = await service.findByEmail('test@testing.com');

    expect(value.email).toEqual(result.email);
    expect(value.username).toEqual(result.username);
  });

  it('findById work', async () => {
    const user = {
      email: 'test@testing.com',
      password: 'password',
      username: 'username',
    }
    const value = await service.createUser(user);
    
    const result = await service.findById(value._id.toString());

    expect(value._id.toString()).toEqual(result._id.toString());
    expect(value.email).toEqual(result.email);
    expect(value.username).toEqual(result.username);
  });

  it('deleteUser work', async () => {
    const user = {
      email: 'test@testing.com',
      password: 'password',
      username: 'username',
    }
    const value = await service.createUser(user);
    
    await service.deleteById(value._id.toString());
    
    expect(await service.findById(value._id.toString())).toEqual(null);
  });
  
  it('updateById work', async () => {
    const user = {
      email: 'test@testing.com',
      password: 'password',
      username: 'username',
    }
    const value = await service.createUser(user);
    const payload: UserUpdateInput = {
      _id: value._id.toString(),
      username: 'anotherUsername',
      email: 'anotherEmail',
    }
    const result = await service.updateById(payload);

    expect(payload._id).toEqual(result._id.toString());
    expect(payload.email).toEqual(result.email);
    expect(payload.username).toEqual(result.username);
    expect(value.password).toEqual(result.password);
  });
  
  it('createUser work', async () => {
    const user = {
      email: 'test@testing.com',
      password: 'password',
      username: 'username',
    }
    const result = await service.createUser(user);
  
    expect(user.email).toEqual(result.email);
    expect(user.username).toEqual(result.username);
  });
});
