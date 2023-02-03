import { Iframework } from './../entities/iframework.entity';
import { IsString } from "class-validator";
import { Unique } from "src/validation";

export class CreateIframeworkDto {
  @IsString()
  @Unique(Iframework, 'code')
  code: string;

  @IsString()
  name: string;
}
