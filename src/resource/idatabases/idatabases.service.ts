import { Injectable } from '@nestjs/common';
import { CreateIdatabaseDto } from './dto/create-idatabase.dto';
import { UpdateIdatabaseDto } from './dto/update-idatabase.dto';

@Injectable()
export class IdatabasesService {
  create(createIdatabaseDto: CreateIdatabaseDto) {
    return 'This action adds a new idatabase';
  }

  findAll() {
    return `This action returns all idatabases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} idatabase`;
  }

  update(id: number, updateIdatabaseDto: UpdateIdatabaseDto) {
    return `This action updates a #${id} idatabase`;
  }

  remove(id: number) {
    return `This action removes a #${id} idatabase`;
  }
}
