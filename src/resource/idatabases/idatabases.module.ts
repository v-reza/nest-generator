import { Module } from '@nestjs/common';
import { IdatabasesService } from './idatabases.service';
import { IdatabasesController } from './idatabases.controller';

@Module({
  controllers: [IdatabasesController],
  providers: [IdatabasesService]
})
export class IdatabasesModule {}
