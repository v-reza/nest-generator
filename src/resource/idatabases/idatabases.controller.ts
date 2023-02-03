import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IdatabasesService } from './idatabases.service';
import { CreateIdatabaseDto } from './dto/create-idatabase.dto';
import { UpdateIdatabaseDto } from './dto/update-idatabase.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('IDatabases')
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

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.idatabasesService.findOne(code);
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateIdatabaseDto: UpdateIdatabaseDto) {
    return this.idatabasesService.update(code, updateIdatabaseDto);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.idatabasesService.remove(code);
  }
}
