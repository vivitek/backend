import { INestApplication } from "@nestjs/common"
import { AppModule } from "../app.module"
import { Test } from '@nestjs/testing';
import { TagService } from './tag.service';
import { TagUpdateInput } from "./schemas/tag.inputs";

describe('TagService', () => {
  let service: TagService;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO= "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication();
    service = module.get<TagService>(TagService);
    await app.init();
  });

  afterEach(async () => {
    await service.findAll().then((tags) => {
      tags.forEach(async tag => {
        await service.deleteById(tag._id.toString())
      })
    })
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(service).toBeDefined();
  });

  it('findAll work', async () => {
    const value = await service.create(tag);
    const anotherValue = await service.create(anotherTag);
    const result = await service.findAll();

    expect(value.name).toEqual(result[0].name);
    expect(anotherValue.name).toEqual(result[1].name);
  });

  it('findById work', async () => {
    const value = await service.create(tag);
    const result = await service.findById(value._id.toString());

    expect(value._id.toString()).toEqual(result._id.toString());
    expect(value.name).toEqual(result.name);
  });

  it('deleteById work', async () => {
    const value = await service.create(tag);
    await service.deleteById(value._id.toString());

    expect(await service.findById(value._id.toString())).toEqual(null);
  });

  it('updateById work', async () => {
    const value = await service.create(tag);
    const payload: TagUpdateInput = {
      _id: value._id.toString(),
      name: 'anotherName',
    }
    const result = await service.updateById(payload);
    const verify = await service.findById(value._id.toString());

    expect(verify._id.toString()).toEqual(result._id.toString());
    expect(verify.name).toEqual(result.name);
  });

  it('createUser work', async () => {
    const result = await service.create(tag);

    expect(tag.name).toEqual(result.name);
  });

  const tag = {
    name: 'tag'
  }
  const anotherTag = {
    name: 'anotherTag'
  }
});
