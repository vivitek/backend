import { Test, TestingModule } from '@nestjs/testing';
import { BanService } from './ban.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ban } from './schemas/ban.schema';
import { BanUpdate, BanCreation } from './schemas/ban.inputs';

const banMaker = (
  _id = 'a uuid',
  address = 'an address',
  banned = false,
  routerSet = {},
) => {
  return {
    _id,
    address,
    banned,
    routerSet,
    save: jest.fn().mockResolvedValue(true),
  };
};

const dropDatabase = jest.fn().mockResolvedValue(true);

describe('BanService', () => {
  let service: BanService;
  let model: Model<Ban>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BanService,
        {
          provide: getModelToken('Ban'),
          useValue: class {
            static find = jest.fn();
            static findById = jest.fn();
            static findOne = jest.fn();
            static findByUrl = jest.fn();
            static findByIdAndDelete = jest.fn();
            static findByIdAndUpdate = jest.fn();
            static update = jest.fn();
            static create = jest.fn();
            static remove = jest.fn();
            static exec = jest.fn();
            static db = {
              dropDatabase,
            };

            constructor(data: BanCreation) {
              const model = banMaker();
              return model;
            }
          },
        },
      ],
    }).compile();

    service = module.get<BanService>(BanService);
    model = module.get<Model<Ban>>(getModelToken('Ban'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all bans', async () => {
    const arr = [banMaker('1')];

    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(arr),
    } as any);

    const result = await service.findAll();
    expect(result).toEqual(arr);
  });

  it('findById work', async () => {
    const value = banMaker();

    const spy = jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(value),
    } as any);

    const result = await service.findById('1');

    expect(result).toEqual(value);
    expect(spy).toHaveBeenCalledWith('1');
  });

  it('findByRouter work', async () => {
    const value = banMaker();

    const spy = jest.spyOn(model, 'find').mockResolvedValueOnce(value as any);

    const result = await service.findByRouter('1');

    expect(result).toEqual(value);
    expect(spy).toHaveBeenCalledWith({
      routerSet: '1',
    });
  });

  it('updateById work', async () => {
    const value = banMaker();

    const spy = jest
      .spyOn(model, 'findByIdAndUpdate')
      .mockResolvedValueOnce(value as any);

    const payload = {
      _id: '1',
      address: '',
      banned: false,
    } as BanUpdate;
    const result = await service.updateById('1', payload);

    expect(result).toEqual(value);
    expect(spy).toHaveBeenCalledWith('1', payload);
  });

  it('deleteById work', async () => {
    const value = banMaker();

    const spy = jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(value),
    } as any);

    expect(await service.deleteById('1')).toEqual(value);
    expect(spy).toHaveBeenCalledWith('1');
  });

  it('create work', async () => {
    const value = await service.create({
      address: 'an address',
      banned: true,
    } as BanCreation);

    expect(value).toBe(true);
  });
});
