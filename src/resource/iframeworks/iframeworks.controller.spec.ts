import { Test, TestingModule } from '@nestjs/testing';
import { IframeworksController } from './iframeworks.controller';
import { IframeworksService } from './iframeworks.service';

describe('IframeworksController', () => {
  let controller: IframeworksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IframeworksController],
      providers: [IframeworksService],
    }).compile();

    controller = module.get<IframeworksController>(IframeworksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
