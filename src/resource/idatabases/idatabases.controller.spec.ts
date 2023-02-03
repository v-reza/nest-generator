import { Test, TestingModule } from '@nestjs/testing';
import { IdatabasesController } from './idatabases.controller';
import { IdatabasesService } from './idatabases.service';

describe('IdatabasesController', () => {
  let controller: IdatabasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdatabasesController],
      providers: [IdatabasesService],
    }).compile();

    controller = module.get<IdatabasesController>(IdatabasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
