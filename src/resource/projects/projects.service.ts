import { DEFAULT_LIMIT, DEFAULT_SKIP } from './../../type/constant';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { CreateProjectSchema } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { GetResponse, PostResponseWithToken } from 'src/type/response';
import { AuthService } from '../auth/auth.service';
import { ResponseError } from 'src/utils/response.list';
import { JWTUser } from 'src/type/request';


@Injectable()
export class ProjectsService {
  constructor(
    @Inject(REQUEST)
    private request: Request,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private authService: AuthService,
  ) { }

  async create(createProjectDto: CreateProjectSchema): Promise<PostResponseWithToken> {
    const { user } = this.request.user as JWTUser
    const project = this.projectRepository.create({
      user: {
        id: user.id
      },
      configuration: {
        application_name: createProjectDto.name
      },
      ...createProjectDto
    })
    await this.projectRepository.save(project)
    const generate = await this.authService.generateJwt(user)

    try {
      return {
        access_token: generate.access_token,
        message: "Project created successfully",
        status: 200
      }
    } catch (error) {
      throw new ResponseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR).getResponse()
    }
  }

  async findAll(): Promise<GetResponse> {
    const { user } = this.request.user as JWTUser
    const record = await this.projectRepository.findBy({
      user: {
        id: user.id
      }
    })
    return {
      total: record.length,
      limit: DEFAULT_LIMIT,
      skip: DEFAULT_SKIP,
      data: record
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
