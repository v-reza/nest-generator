import { Injectable } from '@nestjs/common';
import { CreateRestApiDto } from './dto/create-rest_api.dto';
import { UpdateRestApiDto } from './dto/update-rest_api.dto';

@Injectable()
export class RestApiService {
  create(createRestApiDto: CreateRestApiDto) {
    return 'This action adds a new restApi';
  }

  findAll() {
    return `This action returns all restApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restApi`;
  }

  update(id: number, updateRestApiDto: UpdateRestApiDto) {
    return `This action updates a #${id} restApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} restApi`;
  }
}
