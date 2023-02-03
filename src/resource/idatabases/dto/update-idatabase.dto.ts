import { PartialType } from '@nestjs/swagger';
import { CreateIdatabaseDto } from './create-idatabase.dto';

export class UpdateIdatabaseDto extends PartialType(CreateIdatabaseDto) {}
