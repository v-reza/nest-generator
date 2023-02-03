import { Module } from '@nestjs/common';
import { RestApiService } from './rest_api.service';
import { RestApiController } from './rest_api.controller';

@Module({
  controllers: [RestApiController],
  providers: [RestApiService]
})
export class RestApiModule {}
