import { Test, TestingModule } from '@nestjs/testing';
import { IdatabasesService } from './idatabases.service';

describe('IdatabasesService', () => {
  let service: IdatabasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdatabasesService],
    }).compile();

    service = module.get<IdatabasesService>(IdatabasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
