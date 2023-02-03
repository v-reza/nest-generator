import { PartialType } from '@nestjs/swagger';
import { CreateIframeworkDto } from './create-iframework.dto';
import { IsString } from 'class-validator';

export class UpdateIframeworkDto {
  @IsString()
  name: string;
}
