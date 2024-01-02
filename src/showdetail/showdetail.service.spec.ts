import { Test, TestingModule } from '@nestjs/testing';
import { ShowdetailService } from './showdetail.service';

describe('ShowdetailService', () => {
  let service: ShowdetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShowdetailService],
    }).compile();

    service = module.get<ShowdetailService>(ShowdetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
