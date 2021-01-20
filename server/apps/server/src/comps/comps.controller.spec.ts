import { Test, TestingModule } from '@nestjs/testing';
import { CompsController } from './comps.controller';

describe('CompsController', () => {
  let controller: CompsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompsController],
    }).compile();

    controller = module.get<CompsController>(CompsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
