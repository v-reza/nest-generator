import { IsString } from "class-validator";
import { Unique } from "src/validation";
import { Idatabase } from "../entities/idatabase.entity";

export class CreateIdatabaseDto {
  @IsString()
  @Unique(Idatabase, 'code')
  code: string

  @IsString()
  name: string
}
