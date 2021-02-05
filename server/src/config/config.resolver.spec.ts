import { INestApplication } from "@nestjs/common"
import { AppModule } from "../app.module"
import { Test } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { ConfigResolver } from './config.resolver';
import { Types } from 'mongoose';
import { ConfigCreationInput } from './schemas/config.inputs';

describe('ConfigService', () => {
  let service: ConfigService;
  let resolver: ConfigResolver;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO= "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication();    
    service = module.get<ConfigService>(ConfigService);
    resolver = module.get<ConfigResolver>(ConfigResolver);
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
    expect(resolver).toBeDefined();
  });

  it('should return all', async () => {
    const arr = [];
    const result = await resolver.getConfigs();

    expect(result).toEqual(arr);
  });

  it('getConfig work', async () => {
    const value = await resolver.createConfig(config);
    const result = await resolver.getConfig(value._id.toString());

    expect(value.name).toEqual(result.name)
    expect(value.services.toString()).toEqual(result.services.toString()) // cast array & CoreMongoArray to string
    expect(value.configs.toString()).toEqual(result.configs.toString())
    expect(value.public).toEqual(result.public)
    expect(value.creator).toEqual(result.creator)
  });

  it('updateConfig work', async () => {
    const value = await resolver.createConfig(config);
    const payload = {
      _id: value._id.toString(),
      name: 'config name',
      services: [value._id],
    }
    const result = await resolver.updateConfig(payload);

    expect(payload._id).toEqual(result._id.toString());
    expect(payload.name).toEqual(result.name);
    expect(payload.services).toEqual(result.services);
  });

  it('deleteConfig work', async () => {
    const value = await resolver.createConfig(config);
    await resolver.deleteConfig(value._id.toString())

    expect(await resolver.getConfig(value._id.toString())).toEqual(null);
  });

  it('subscriptions exists', async () => {
    const value = await resolver.createConfig(config);

    expect(await resolver.configCreated(value.creator.toString())).toBeDefined();
    expect(await resolver.configUpdated(value.creator.toString())).toBeDefined();
  });

  it('create work', async () => {
    const value = await resolver.createConfig(config);

    expect(value.name).toEqual('config name');
  });
});
