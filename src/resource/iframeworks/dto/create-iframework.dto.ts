import { Unique } from 'src/validation/unique';
import { Iframework } from './../entities/iframework.entity';
import { IsString } from "class-validator";

export class CreateIframeworkDto {
  @IsString()
  @Unique(Iframework, 'code')
  code: string;

  @IsString()
  name: string;
}
