import { Test, TestingModule } from '@nestjs/testing';
import { BanController } from './ban.controller';

describe('Ban Controller', () => {
  let controller: BanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BanController],
    }).compile();

    controller = module.get<BanController>(BanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
