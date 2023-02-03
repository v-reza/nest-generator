import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IframeworksService } from './iframeworks.service';
import { CreateIframeworkDto } from './dto/create-iframework.dto';
import { UpdateIframeworkDto } from './dto/update-iframework.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('IFrameworks')
@Controller('iframeworks')
export class IframeworksController {
  constructor(private readonly iframeworksService: IframeworksService) {}

  @Post()
  create(@Body() createIframeworkDto: CreateIframeworkDto) {
    return this.iframeworksService.create(createIframeworkDto);
  }

  @Get()
  findAll() {
    return this.iframeworksService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.iframeworksService.findOne(code);
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateIframeworkDto: UpdateIframeworkDto) {
    return this.iframeworksService.update(code, updateIframeworkDto);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.iframeworksService.remove(code);
  }
}
