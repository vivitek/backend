import { INestApplication } from "@nestjs/common"
import { AppModule } from "../app.module"
import { Test } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { Types } from 'mongoose';
import { ConfigCreationInput } from './schemas/config.inputs';

describe('ConfigService', () => {
  let service: ConfigService;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO= "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication();
    service = module.get<ConfigService>(ConfigService);
    await app.init();
  });

  afterEach(async () => {
    await service.findAll().then((configs) => {
      configs.forEach(async config => {
        await service.deleteById(config._id.toString())
      })
    })
    await app.close();
  });

  const id = new Types.ObjectId
  const config: ConfigCreationInput = {
    name: 'config name',
    services: [],
    configs: [],
    public: true,
    creator: id,
  }

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return all', async () => {
    const result = await service.findAll();
    expect(result.length).toBe(0);
  });

  it('findById work', async () => {
    const value = await service.create(config);
    const result = await service.findById(value._id.toString());

    expect(value.name).toEqual(result.name)
    expect(value.services.toString()).toEqual(result.services.toString())
    expect(value.configs.toString()).toEqual(result.configs.toString())
    expect(value.public).toEqual(result.public)
    expect(value.creator).toEqual(result.creator)
  });

  it('updateById work', async () => {
    const value = await service.create(config);
    const payload = {
      _id: value._id.toString(),
      name: 'config name',
      services: [value._id],
    }
    const result = await service.updateById(payload);

    expect(payload._id).toEqual(result._id.toString());
    expect(payload.name).toEqual(result.name);
    expect(payload.services).toEqual(result.services);
  });

  it('deleteById work', async () => {
    const value = await service.create(config);
    await service.deleteById(value._id.toString())

    expect(await service.findById(value._id.toString())).toEqual(null);
  });

  it('create work', async () => {
    const value = await service.create(config);

    expect(value.name).toEqual(config.name);
  });
});
