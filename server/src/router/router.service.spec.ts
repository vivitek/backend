import { Test, TestingModule } from '@nestjs/testing';
import { RouterService } from './router.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Router } from './schemas/router.schema';
import { RouterUpdateInput, RouterCreationInput } from './schemas/router.inputs';
 
const routerMaker = (
  _id = 'a uuid',
  name = 'a router',
  url = 'a url',
) => {
  return {
    _id,
    name,    
    url,
    save: jest.fn().mockResolvedValue(true),
  };
};
 
const dropDatabase = jest.fn().mockResolvedValue(true);
 
describe('RouterService', () => {
  let service: RouterService;
  let model: Model<Router>;
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RouterService,
        {
          provide: getModelToken('Router'),
          useValue: class {
            static find = jest.fn();
            static findById = jest.fn();
            static findOne =  jest.fn()
            static findByUrl = jest.fn()
            static findByIdAndDelete = jest.fn()
            static findOneAndUpdate = jest.fn()
            static update = jest.fn()
            static create = jest.fn()
            static remove = jest.fn()
            static exec = jest.fn()
            static db = {
              dropDatabase,
            };

            constructor(data: RouterCreationInput) {
              const model = routerMaker('an id', data.name, data.url);
              return model;
            }
          }
        },
      ],
    }).compile();
 
    service = module.get<RouterService>(RouterService);
    model = module.get<Model<Router>>(getModelToken('Router'));
  });
 
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
 
  it('should return all routers', async () => {
    const arr = [
      routerMaker('1', 'router #1', 'url #1'),
    ];
 
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(arr),
    } as any);
 
    const result = await service.findAll();
    expect(result).toEqual(arr);
  });
 
  it('findById work', async () => {
    const value = routerMaker('1', 'router #1', 'url #1');
 
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(value),
    } as any);
 
    const result = await service.findById('1');
    expect(result).toEqual(value);
  });
 
  it('findByUrl work', async () => {
    const value = routerMaker('1', 'router #1', 'url #1');
 
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(value),
    } as any);
 
    const result = await service.findByUrl('a url');
    expect(result).toEqual(value);
  });
 
  it('updateById work', async () => {
    const value = routerMaker('1', 'router #1', 'url #1');
 
    jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(value),
    } as any);
 
    const result = await service.updateById({} as RouterUpdateInput);
    expect(result).toEqual(value);
  });
 
  it('deleteById work', async () => {
    const value = routerMaker('1', 'router #1', 'url #1');
 
    jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(value as any);
 
    expect(await service.deleteById('an id')).toEqual(value);
  });

  it('create work', async () => {
    const value = await service.create({
      name: 'a name',
      url: 'an url',      
    });
 
    expect(value).toBe(true);
  });
});