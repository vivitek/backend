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


  it('should return all bans', async () => {
    const arr = [];

    const result = await service.findAll();
    expect(result).toEqual(arr);
  });

  it('findById work', async () => {
    const ban: BanCreation = {
      address: 'url.com',
      banned: true,
      routerSet: '',
    }
    const value = await service.create(ban);

    const result = await service.findById(value._id.toString());

    expect(ban.address).toEqual(result.address)
    expect(ban.banned).toEqual(result.banned)
    expect(ban.routerSet).toEqual(result.routerSet)
  });

  it('findByRouter work', async () => {
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
    const value = await service.create(ban);
    const anotherValue = await service.create(anotherBan);

    const result = await service.findByRouter(value.routerSet.toString());
    const anotherResult = await service.findByRouter(anotherValue.routerSet.toString());

    expect(ban.address).toEqual(result[0].address);
    expect(ban.address).toEqual(anotherResult[0].address);
    expect(anotherBan.address).toEqual(result[1].address);
    expect(anotherBan.address).toEqual(anotherResult[1].address);
  });

  it('updateById work', async () => {
    const ban: BanCreation = {
      address: 'url.com',
      banned: false,
      routerSet: '1',
    }
    const value = await service.create(ban);
    const payload = {
      _id: value._id,
      banned: true,
      routerSet: '1',
    }
    const result = await service.updateById(value._id.toString(), payload);

    expect(payload._id).toEqual(result._id);
    expect(payload.banned).toEqual(result.banned);
    expect(payload.routerSet).toEqual(result.routerSet);
  });

  it('deleteById work', async () => {
    const ban: BanCreation = {
      address: 'url.com',
      banned: false,
      routerSet: '1',
    }
    const value = await service.create(ban);

    await service.deleteById(value._id.toString())

    expect(await service.findById(value._id.toString())).toEqual(null);
  });

  it('create work', async () => {
    const value = await service.create({
      address: 'an address',
      banned: true,
      routerSet: '1',
    });
    expect(value.address).toEqual('an address');
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
