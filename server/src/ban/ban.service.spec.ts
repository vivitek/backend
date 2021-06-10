import { Test } from '@nestjs/testing';
import { INestApplication } from "@nestjs/common"
import { BanService } from './ban.service';
import { BanCreation } from './schemas/ban.inputs';
import { AppModule } from "../app.module"

describe('BanService', () => {
  let service: BanService;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO= "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication();
    service = module.get<BanService>(BanService);
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(service).toBeDefined()
  })

  const ban: BanCreation = {
    address: 'url.com',
    banned: false,
    routerSet: '1',
  }
  const anotherBan: BanCreation = {
    address: 'anortherUrl.com',
    banned: true,
    routerSet: '1',
  }

  it('should return all bans', async () => {
    const result = await service.findAll();
    expect(result.length).toBe(0);
  });

  it('findById work', async () => {
    const value = await service.create(ban);
    const result = await service.findById(value._id.toString());

    expect(value.address).toEqual(result.address)
    expect(value.banned).toEqual(result.banned)
    expect(value.routerSet).toEqual(result.routerSet)
  });

  it('findByRouter work', async () => {
    const value = await service.create(ban);
    const anotherValue = await service.create(anotherBan);

    const result = await service.findByRouter(value.routerSet.toString());
    const anotherResult = await service.findByRouter(anotherValue.routerSet.toString());

    expect(value.address).toEqual(result[0].address);
    expect(value.address).toEqual(anotherResult[0].address);
    expect(anotherValue.address).toEqual(result[1].address);
    expect(anotherValue.address).toEqual(anotherResult[1].address);
  });

  it('updateById work', async () => {
    const value = await service.create(ban);
    const payload = {
      _id: value._id.toString(),
      banned: true,
      routerSet: '1',
    }
    const result = await service.updateById(value._id.toString(), payload);

    expect(payload._id.toString()).toEqual(result._id.toString());
    expect(payload.banned).toEqual(result.banned);
    expect(payload.routerSet).toEqual(result.routerSet);
  });

  it('deleteById work', async () => {
    const value = await service.create(ban);
    await service.deleteById(value._id.toString())

    expect(await service.findById(value._id.toString())).toEqual(null);
  });

  it('deleteByRouter work', async () => {
    const value = await service.create(ban);
    await service.deleteByRouter(value._id.toString())

    expect(await service.findByRouter(value._id.toString())).toEqual([]);
  });

  it('create work', async () => {
    const value = await service.create(ban);

    expect(value.address).toEqual(ban.address);
  });

  afterEach(async () => {
    await service.findAll().then((bans) => {
      bans.forEach(async ban => {
        await service.deleteById(ban._id.toString())
      })
    })
    await app.close();
  });
});
