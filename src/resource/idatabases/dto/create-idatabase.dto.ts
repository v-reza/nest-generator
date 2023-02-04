import { IsString } from "class-validator";
import { Idatabase } from "../entities/idatabase.entity";
// import { Unique } from "src/validation/unique";

export class CreateIdatabaseDto {
  @IsString()
  // @Unique(Idatabase, 'code')
  code: string

  @IsString()
  name: string
}
