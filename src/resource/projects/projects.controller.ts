import { QueryMethod } from './../../type/query';
import { JwtAuthGuard } from './../auth/jwt-auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UsePipes
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectSchema } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformQueryPipe } from '../../type/transform-query.pipe';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createProjectDto: CreateProjectSchema) {
    return this.projectsService.create(createProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: '$limit',
    required: false,
    schema: {
      type: 'number',
      default: 10,
    }
  })
  @Get()
  findAll(@Query(new TransformQueryPipe()) query: any) {
    return this.projectsService.findAll(query);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string, @Query(new TransformQueryPipe()) query: any) {
    return this.projectsService.findOne(id, query);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
