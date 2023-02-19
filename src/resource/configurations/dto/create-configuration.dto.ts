import { IsNumber, IsString, IsObject } from 'class-validator';
import { IsNullable } from '../../../validation/nullable';

export class CreateConfigurationDto {
  @IsObject()
  @IsNullable()
  database: any;

  @IsString()
  @IsNullable()
  database_host: string;

  @IsNumber()
  @IsNullable()
  database_port: number;

  @IsString()
  @IsNullable()
  database_name: string;

  @IsString()
  @IsNullable()
  database_username: string;

  @IsString()
  @IsNullable()
  database_password: string;

  @IsString()
  @IsNullable()
  application_name: string;

  @IsObject()
  @IsNullable()
  framework: any;
}
