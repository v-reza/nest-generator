import { Test, TestingModule } from '@nestjs/testing';
import { IframeworksService } from './iframeworks.service';

describe('IframeworksService', () => {
  let service: IframeworksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IframeworksService],
    }).compile();

    service = module.get<IframeworksService>(IframeworksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
