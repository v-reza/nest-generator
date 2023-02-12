import { PickQueryOrder } from './../../type/query';
import { DeleteResponse, PatchResponseWithToken } from './../../type/response';
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
import { ResponseError, ResponseSuccess } from 'src/utils/response.list';
import { JWTUser } from 'src/type/request';
import { QueryParameter } from 'src/type/query';
import * as _ from 'lodash';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(REQUEST)
    private request: Request,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private authService: AuthService,
  ) {}

  async create(
    createProjectDto: CreateProjectSchema,
  ): Promise<PostResponseWithToken> {
    try {
      const { user } = this.request.user as JWTUser;
      const project = this.projectRepository.create({
        user: {
          id: user.id,
        },
        configuration: {
          application_name: createProjectDto.name,
        },
        ...createProjectDto,
      });
      await this.projectRepository.save(project);
      const generate = await this.authService.generateJwt(user);

      const response = new ResponseSuccess('createWithToken', project);
      return response.getResponse({
        access_token: generate.access_token,
        message: 'Project created successfully',
        status: 200,
      }) as PostResponseWithToken;
    } catch (error) {
      throw new ResponseError(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      ).getResponse();
    }
  }

  async findAll(
    query: QueryParameter<CreateProjectSchema>,
  ): Promise<GetResponse> {
    const { user } = this.request.user as JWTUser;
    const { qWhere, qFilter } = query;
    const record = await this.projectRepository.find({
      where: {
        user: {
          id: user.id,
        },
        ...qWhere,
      },
      ...qFilter,
      relations: ['configuration'],
    });

    const response = new ResponseSuccess('find', record, query);
    return response.getResponse() as GetResponse;
  }

  async findOne(
    id: string,
    query: Pick<QueryParameter<CreateProjectSchema>, 'qWhere'> & PickQueryOrder,
  ): Promise<GetResponse> {
    const { user } = this.request.user as JWTUser;
    const { qWhere, qFilter } = query;
    const record = await this.projectRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
        ...qWhere,
      },
      ...qFilter,
      relations: ['configuration'],
    });
    if (!record)
      throw new ResponseError(
        'Project not found',
        HttpStatus.NOT_FOUND,
      ).getResponse();

    const response = new ResponseSuccess('findOne', record);
    return response.getResponse() as GetResponse;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<PatchResponseWithToken> {
    const { user } = this.request.user as JWTUser;
    await this.projectRepository.update({ id }, updateProjectDto);
    const generate = await this.authService.generateJwt(user);

    const response = new ResponseSuccess('updateWithToken');
    return response.getResponse({
      access_token: generate.access_token,
      message: 'Project updated successfully',
      status: 200,
    }) as PatchResponseWithToken;
  }

  async remove(id: string): Promise<DeleteResponse> {
    await this.projectRepository.delete({ id });
    return {
      message: 'Project deleted successfully',
      status: 200,
    };
  }
}
