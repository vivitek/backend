import { Test } from '@nestjs/testing';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../app.module";
import { ServiceService } from './service.service';

describe('ServiceService', () => {
  let service: ServiceService;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO= "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication();
    service = module.get<ServiceService>(ServiceService);
    await app.init();
  });

  afterEach(async () => {
    await service.findAll().then((servs) => {
      servs.forEach(async serv => {
        await service.deleteById(serv._id.toString())
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
  });

  it('should return all', async () => {
    const result = await service.findAll();
    expect(result.length).toBe(0);
  });

  it('findByRouter work', async () => {
    const value = await service.create(sample);
    const anotherValue = await service.create(anotherSample);

    const result = await service.findByRouter(value.router.toString());
    const anotherResult = await service.findByRouter(value.router.toString());

    expect(value.name).toEqual(result[0].name);
    expect(value.name).toEqual(anotherResult[0].name);
    expect(anotherValue.name).toEqual(result[1].name);
    expect(anotherValue.name).toEqual(anotherResult[1].name);
  });

  it('findById work', async () => {
    const value = await service.create(sample);
    const result = await service.findById(value._id.toString());

    expect(value._id.toString()).toEqual(result._id.toString())
    expect(value.name).toEqual(result.name)
    expect(value.bandwidth).toEqual(result.bandwidth)
    expect(value.banned).toEqual(result.banned)
    expect(value.tags[0]).toEqual(result.tags[0])
    expect(value.ips[0]).toEqual(result.ips[0])
  });

  it('updateById work', async () => {
    const value = await service.create(sample);
    const payload = {
      _id: value._id.toString(),
      bandwidth: 1,
      banned: true,
    }
    const result = await service.updateById(payload);

    expect(payload._id).toEqual(result._id.toString());
    expect(value.name).toEqual(result.name)
    expect(value.tags[0]).toEqual(result.tags[0])
    expect(value.ips[0]).toEqual(result.ips[0])
    expect(payload.bandwidth).toEqual(result.bandwidth);
    expect(payload.banned).toEqual(result.banned);
  });

  it('deleteById work', async () => {
    const value = await service.create(sample);
    await service.deleteById(value._id.toString())

    expect(await service.findById(value._id.toString())).toEqual(null);
  });

  it('deleteByRouter work', async () => {
    const value = await service.create(sample);
    await service.deleteByRouter(value.router.toString())

    expect(await service.findByRouter(value._id.toString())).toEqual([]);
  });

  it('create work', async () => {
    const value = await service.create(sample);

    expect(value.name).toEqual(sample.name);
  });
});