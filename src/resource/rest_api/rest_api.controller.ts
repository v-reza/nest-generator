import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestApiService } from './rest_api.service';
import { CreateRestApiDto } from './dto/create-rest_api.dto';
import { UpdateRestApiDto } from './dto/update-rest_api.dto';

@Controller('rest-api')
export class RestApiController {
  constructor(private readonly restApiService: RestApiService) {}

  @Post()
  create(@Body() createRestApiDto: CreateRestApiDto) {
    return this.restApiService.create(createRestApiDto);
  }

  @Get()
  findAll() {
    return this.restApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restApiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestApiDto: UpdateRestApiDto) {
    return this.restApiService.update(+id, updateRestApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restApiService.remove(+id);
  }
}
