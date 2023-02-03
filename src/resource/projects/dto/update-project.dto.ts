import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectSchema } from './create-project.dto';
import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateConfigurationDto } from 'src/resource/configurations/dto/create-configuration.dto';

export class UpdateProjectDto extends PartialType(CreateProjectSchema) {
  @Type(() => CreateConfigurationDto)
  @ValidateNested()
  configuration: CreateConfigurationDto
}
