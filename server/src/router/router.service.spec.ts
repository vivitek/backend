import { Test } from '@nestjs/testing';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../app.module";
import { RouterService } from './router.service';

describe('RouterService', () => {
  let service: RouterService;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO= "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication();
    service = module.get<RouterService>(RouterService);
    await app.init();
  });

  afterEach(async () => {
    await service.findAll().then((routers) => {
      routers.forEach(async router => {
        await service.deleteById(router._id.toString())
      })
    })
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return all', async () => {
    const result = await service.findAll();
    expect(result.length).toBe(0);
  });

  it('findByUrl work', async () => {
    const value = await service.create(router);
    const result = await service.findByUrl(value.url);

    expect(value.name).toEqual(result.name)
    expect(value.url).toEqual(result.url)
    expect(value._id.toString()).toEqual(result._id.toString())
  });

  it('findById work', async () => {
    const value = await service.create(router);
    const result = await service.findById(value._id.toString());

    expect(value.name).toEqual(result.name)
    expect(value.url).toEqual(result.url)
    expect(value._id.toString()).toEqual(result._id.toString())
  });

  it('updateById work', async () => {
    const value = await service.create(router);
    const payload = {
      url: 'another string',
      name: 'router name',
      id: value._id.toString(),
    }
    const result = await service.updateById(payload);

    expect(payload.id).toEqual(result._id.toString());
    expect(payload.name).toEqual(result.name);
    expect(payload.url).toEqual(result.url);
  });

  it('deleteById work', async () => {
    const value = await service.create(router);

    await service.deleteById(value._id.toString())

    expect(await service.findById(value._id.toString())).toEqual(null);
  });

  it('create work', async () => {
    const value = await service.create(router);
    expect(value.name).toEqual(router.name);
  });
  const router = {
    name: 'router name',
    url: 'url',
  }
});