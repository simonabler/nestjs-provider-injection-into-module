import { Test, TestingModule } from '@nestjs/testing';
import { MyLibController } from './my-lib.controller';

describe('MyLibController', () => {
  let controller: MyLibController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyLibController],
    }).compile();

    controller = module.get<MyLibController>(MyLibController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
