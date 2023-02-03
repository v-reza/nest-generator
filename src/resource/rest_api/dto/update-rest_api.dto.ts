import { PartialType } from '@nestjs/swagger';
import { CreateRestApiDto } from './create-rest_api.dto';

export class UpdateRestApiDto extends PartialType(CreateRestApiDto) {}
