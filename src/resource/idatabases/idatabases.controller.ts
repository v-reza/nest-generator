import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IdatabasesService } from './idatabases.service';
import { CreateIdatabaseDto } from './dto/create-idatabase.dto';
import { UpdateIdatabaseDto } from './dto/update-idatabase.dto';

@Controller('idatabases')
export class IdatabasesController {
  constructor(private readonly idatabasesService: IdatabasesService) {}

  @Post()
  create(@Body() createIdatabaseDto: CreateIdatabaseDto) {
    return this.idatabasesService.create(createIdatabaseDto);
  }

  @Get()
  findAll() {
    return this.idatabasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.idatabasesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdatabaseDto: UpdateIdatabaseDto) {
    return this.idatabasesService.update(+id, updateIdatabaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.idatabasesService.remove(+id);
  }
}
