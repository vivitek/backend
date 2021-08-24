import { Test } from '@nestjs/testing';
import { INestApplication } from "@nestjs/common"
import { BanService } from './ban.service';
import { BanResolver } from './ban.resolver';
import { BanCreation } from './schemas/ban.inputs';
import { AppModule } from "../app.module"

describe('BanResolver', () => {
  let service: BanService;
  let resolver: BanResolver;
  let app: INestApplication;

  beforeEach(async () => {
    process.env.MONGO= "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication();
    service = module.get<BanService>(BanService);
    resolver = module.get<BanResolver>(BanResolver);
    await app.init();
  });

  const ban: BanCreation = {
    address: 'url.com',
    banned: true,
    routerSet: '1',
  }
  const anotherBan: BanCreation = {
    address: 'anortherUrl.com',
    banned: true,
    routerSet: '1',
  }

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(service).toBeDefined()
    expect(resolver).toBeDefined()
  })


  it('should return all bans', async () => {
    const result = await service.findAll();
    expect(result.length).toBe(0);
  });

  it('getBans work', async () => {
    const value = await resolver.createBan(ban);
    const anotherValue = await resolver.createBan(anotherBan);

    const result = await resolver.getBans(value.routerSet.toString());
    const anotherResult = await resolver.getBans(anotherValue.routerSet.toString());

    expect(value.address).toEqual(result[0].address);
    expect(value.address).toEqual(anotherResult[0].address);
    expect(anotherValue.address).toEqual(result[1].address);
    expect(anotherValue.address).toEqual(anotherResult[1].address);
  });

  it('updateBan work', async () => {
    const value = await resolver.createBan(ban);
    const payload = {
      _id: value._id.toString(),
      banned: true,
      routerSet: '1',
    }
    const result = await resolver.updateBan(payload);

    expect(payload._id.toString()).toEqual(result._id.toString());
    expect(payload.banned).toEqual(result.banned);
    expect(payload.routerSet).toEqual(result.routerSet);
  });

  it('deleteBan work', async () => {
    const value = await resolver.createBan(ban);
    await resolver.deleteBan(value._id.toString())

    expect(await service.findById(value._id.toString())).toEqual(null);
  });

  it('deleteByRouter work', async () => {
    const value = await resolver.createBan(ban);
    await resolver.deleteBansByRouter(value._id.toString())
    await resolver.getBans(value._id.toString())

    expect(await service.findByRouter(value._id.toString())).toEqual([]);
  });

  it('createBan work', async () => {
    const value = await resolver.createBan(ban);

    expect(value.address).toEqual(ban.address);
  });

  it('Subscriptions exists', async () => {
    const value = await resolver.createBan(ban);

    expect(await resolver.banCreated(value.routerSet.toString())).toBeDefined()
    expect(await resolver.banUpdated(value.routerSet.toString())).toBeDefined()
    expect(await resolver.routerSet(value, false)).toBeDefined()
  })

  afterEach(async () => {
    await service.findAll().then((bans) => {
      bans.forEach(async ban => {
        await service.deleteById(ban._id.toString())
      })
    })
    await app.close();
  });
});
