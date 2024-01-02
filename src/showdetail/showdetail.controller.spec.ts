import { Test, TestingModule } from '@nestjs/testing';
import { ShowdetailController } from './showdetail.controller';

describe('ShowdetailController', () => {
  let controller: ShowdetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowdetailController],
    }).compile();

    controller = module.get<ShowdetailController>(ShowdetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
