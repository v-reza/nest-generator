import { Module } from '@nestjs/common';
import { IdatabasesService } from './idatabases.service';
import { IdatabasesController } from './idatabases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idatabase } from './entities/idatabase.entity';

@Module({
  controllers: [IdatabasesController],
  providers: [IdatabasesService],
  imports: [TypeOrmModule.forFeature([Idatabase])]
})
export class IdatabasesModule {}
