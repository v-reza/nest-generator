import { Test, TestingModule } from '@nestjs/testing';
import { RestApiController } from './rest_api.controller';
import { RestApiService } from './rest_api.service';

describe('RestApiController', () => {
  let controller: RestApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestApiController],
      providers: [RestApiService],
    }).compile();

    controller = module.get<RestApiController>(RestApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
