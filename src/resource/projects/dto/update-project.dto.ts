import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectSchema } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectSchema) {}
