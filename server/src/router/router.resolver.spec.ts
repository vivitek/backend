import { Test } from '@nestjs/testing';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../app.module";
import { RouterResolver } from './router.resolver';

describe('RouterResolver', () => {
  let resolver: RouterResolver;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO= "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication();
    resolver = module.get<RouterResolver>(RouterResolver);
    await app.init();
  });

  afterEach(async () => {
    await resolver.getRouters().then((routers) => {
      routers.forEach(async router => {
        await resolver.deleteRouter(router._id.toString())
      })
    })
    await app.close();
  });

  const router = {
    name: 'router name',
    url: 'url',
  }

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(resolver).toBeDefined();
  });

  it('should return all', async () => {
    const result = await resolver.getRouters();
    expect(result.length).toBe(0);
  });

  it('getRouterByUrl work', async () => {
    const value = await resolver.createRouter(router);
    const result = await resolver.getRouterByUrl(value.url);

    expect(value.name).toEqual(result.name)
    expect(value.url).toEqual(result.url)
    expect(value._id.toString()).toEqual(result._id.toString())
  });

  it('getRouter work', async () => {
    const value = await resolver.createRouter(router);
    const result = await resolver.getRouter(value._id.toString());

    expect(value.name).toEqual(result.name)
    expect(value.url).toEqual(result.url)
    expect(value._id.toString()).toEqual(result._id.toString())
  });

  it('updateRouter work', async () => {
    const value = await resolver.createRouter(router);
    const payload = {
      url: 'another string',
      name: 'router name',
      id: value._id.toString(),
    }
    const result = await resolver.updateRouter(payload);

    expect(payload.id).toEqual(result._id.toString());
    expect(payload.name).toEqual(result.name);
    expect(payload.url).toEqual(result.url);
  });

  it('deleteRouter work', async () => {
    const value = await resolver.createRouter(router);
    await resolver.deleteRouter(value._id.toString())

    expect(await resolver.getRouter(value._id.toString())).toEqual(null);
  });

  it('suscribtions exists', async () => {
    expect(resolver.routerCreated()).toBeDefined();
    expect(resolver.routerDeleted()).toBeDefined();
    expect(resolver.routerUpdated()).toBeDefined();

  });

  it('createRouter work', async () => {
    const value = await resolver.createRouter(router);

    expect(value.name).toEqual(router.name);
  });
});