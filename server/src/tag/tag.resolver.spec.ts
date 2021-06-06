import { INestApplication } from "@nestjs/common"
import { AppModule } from "../app.module"
import { Test } from '@nestjs/testing';
import { TagResolver } from './tag.resolver';
import { TagUpdateInput } from "./schemas/tag.inputs";

describe('TagResolver', () => {
  let resolver: TagResolver;
  let app: INestApplication

  beforeEach(async () => {
    process.env.MONGO= "mongo:27017/test"
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication();
    resolver = module.get<TagResolver>(TagResolver);
    await app.init();
  });

  afterEach(async () => {
    await resolver.getTags().then((tags) => {
      tags.forEach(async tag => {
        await resolver.deleteTag(tag._id.toString())
      })
    })
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(resolver).toBeDefined();
  });

  it('getTags work', async () => {
    const value = await resolver.createTag(tag);
    const anotherValue = await resolver.createTag(anotherTag);
    const result = await resolver.getTags();

    expect(value.name).toEqual(result[0].name);
    expect(anotherValue.name).toEqual(result[1].name);
  });

  it('deleteTag work', async () => {
    const value = await resolver.createTag(tag);
    await resolver.deleteTag(value._id.toString());

    expect(await resolver.getTag(value._id.toString())).toEqual(null);
  });

  it('updateTag work', async () => {
    const value = await resolver.createTag(tag);
    const payload: TagUpdateInput = {
      _id: value._id.toString(),
      name: 'anotherName',
    }
    const result = await resolver.updateTag(payload);
    const verify = await resolver.getTag(value._id.toString());

    expect(verify._id.toString()).toEqual(result._id.toString());
    expect(verify.name).toEqual(result.name);
  });

  it('createUser work', async () => {
    const result = await resolver.createTag(tag);

    expect(tag.name).toEqual(result.name);
  });

  const tag = {
    name: 'tag'
  }
  const anotherTag = {
    name: 'anotherTag'
  }
});
