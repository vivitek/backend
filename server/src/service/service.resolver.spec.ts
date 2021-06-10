import { Test } from '@nestjs/testing';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../app.module";
import { ServiceService } from './service.service';
import { ServiceResolver } from './service.resolver';

describe('ServiceResolver', () => {
  let service: ServiceService;
  let resolver: ServiceResolver;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO= "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication();
    service = module.get<ServiceService>(ServiceService);
    resolver = module.get<ServiceResolver>(ServiceResolver);
    await app.init();
  });

  afterEach(async () => {
    await service.findAll().then((servs) => {
      servs.forEach(async serv => {
        await resolver.deleteService(serv._id.toString())
      })
    })
    await app.close();
  });

  const sample = {
    name: 'service name',
    bandwidth: 5,
    tags: ['tag id'],
    ips: ['ip address'],
    router: 'router id',
    banned: false,
  }
  const anotherSample = {
    name: 'another service name',
    bandwidth: 6,
    tags: ['another tag id'],
    ips: ['another ip address'],
    router: 'router id',
    banned: true,
  }

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(service).toBeDefined();
    expect(resolver).toBeDefined();
  });

  it('getServicesForRouteur work', async () => {
    const value = await resolver.createService(sample);
    const anotherValue = await resolver.createService(anotherSample);

    const result = await resolver.getServicesForRouter(value.router.toString());
    const anotherResult = await resolver.getServicesForRouter(value.router.toString());

    expect(value.name).toEqual(result[0].name);
    expect(value.name).toEqual(anotherResult[0].name);
    expect(anotherValue.name).toEqual(result[1].name);
    expect(anotherValue.name).toEqual(anotherResult[1].name);
  });

  it('updateService work', async () => {
    const value = await resolver.createService(sample);
    const payload = {
      _id: value._id.toString(),
      bandwidth: 1,
      banned: true,
    }
    const result = await resolver.updateService(payload);

    expect(payload._id).toEqual(result._id.toString());
    expect(value.name).toEqual(result.name)
    expect(value.tags[0]).toEqual(result.tags[0])
    expect(value.ips[0]).toEqual(result.ips[0])
    expect(payload.bandwidth).toEqual(result.bandwidth);
    expect(payload.banned).toEqual(result.banned);
  });

  it('deleteService work', async () => {
    const value = await resolver.createService(sample);
    await resolver.deleteService(value._id.toString())

    expect(await service.findById(value._id.toString())).toEqual(null);
  });

  it('deleteByRouter work', async () => {
    const value = await resolver.createService(sample);
    await resolver.deleteByRouter(value.router.toString())

    expect(await service.findByRouter(value._id.toString())).toEqual([]);
  });

  it('createService work', async () => {
    const value = await resolver.createService(sample);

    expect(value.name).toEqual(sample.name);
  });
});