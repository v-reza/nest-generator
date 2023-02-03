import { IsJSON, IsNumber, IsString } from "class-validator";

export class CreateConfigurationDto {
  @IsJSON()
  database: any
  
  @IsString()
  database_host: string

  @IsNumber()
  database_port: number

  @IsString()
  database_name: string

  @IsString()
  database_username: string

  @IsString()
  database_password: string

  @IsString()
  application_name: string

  @IsJSON()
  framework: any
}
