import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Config } from './schemas/config.schema';
import {
  ConfigUpdateInput,
  ConfigCreationInput,
} from './schemas/config.inputs';

const configMaker = (
  _id = 'a uuid',
  isPublic = false,
  creator = {},
  name = 'a name',
  services = [],
  configs = [],
) => {
  return {
    _id,
    public: isPublic,
    creator,
    name,
    services,
    configs,
    save: jest.fn().mockResolvedValue(true),
  };
};

const dropDatabase = jest.fn().mockResolvedValue(true);

describe('ConfigService', () => {
  let service: ConfigService;
  let model: Model<Config>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: getModelToken('Config'),
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

            constructor() {
              const model = configMaker();
              return model;
            }
          },
        },
      ],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
    model = module.get<Model<Config>>(getModelToken('Config'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all', async () => {
    const arr = [configMaker()];

    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(arr),
    } as any);

    const result = await service.findAll();
    expect(result).toEqual(arr);
  });

  it('findById work', async () => {
    const value = configMaker();

    const spy = jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(value),
    } as any);

    const result = await service.findById('1');

    expect(result).toEqual(value);
    expect(spy).toHaveBeenCalledWith('1');
  });

  it('updateById work', async () => {
    const value = configMaker();

    const spy = jest
      .spyOn(model, 'findByIdAndUpdate')
      .mockResolvedValueOnce(value as any);

    const payload = {
      _id: '1',
      name: 'a name',
    } as ConfigUpdateInput;
    const result = await service.updateById(payload);

    expect(result).toEqual(value);
    expect(spy).toHaveBeenCalledWith('1', payload);
  });

  it('deleteById work', async () => {
    const value = configMaker();

    const spy = jest
      .spyOn(model, 'findByIdAndDelete')
      .mockResolvedValueOnce(value as any);

    expect(await service.deleteById('1')).toEqual(value);
    expect(spy).toHaveBeenCalledWith('1');
  });

  it('create work', async () => {
    const value = await service.create({
      name: 'an address',
    } as ConfigCreationInput);

    expect(value).toBe(true);
  });
});
