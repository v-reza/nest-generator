import { Test, TestingModule } from '@nestjs/testing';
import { RestApiService } from './rest_api.service';

describe('RestApiService', () => {
  let service: RestApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestApiService],
    }).compile();

    service = module.get<RestApiService>(RestApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
