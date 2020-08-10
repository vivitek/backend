import { Test, TestingModule } from '@nestjs/testing';
import { IpService } from './ip.service';

describe('Ip Service', () => {
  let service: IpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpService],
    }).compile();

    service = module.get<IpService>(IpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
