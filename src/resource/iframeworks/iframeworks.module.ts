import { Module } from '@nestjs/common';
import { IframeworksService } from './iframeworks.service';
import { IframeworksController } from './iframeworks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Iframework } from './entities/iframework.entity';

@Module({
  controllers: [IframeworksController],
  providers: [IframeworksService],
  imports: [TypeOrmModule.forFeature([Iframework])]
})
export class IframeworksModule { }
