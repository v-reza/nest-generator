import { PartialType } from '@nestjs/swagger';
import { CreateIdatabaseDto } from './create-idatabase.dto';
import { IsString } from 'class-validator';

export class UpdateIdatabaseDto {
  @IsString()
  name: string
}
