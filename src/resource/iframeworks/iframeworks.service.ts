import { DEFAULT_LIMIT, DEFAULT_SKIP } from './../../type/constant';
import { GetResponse, PostResponseOnlyData, PatchResponseOnlyData, DeleteResponse } from './../../type/response';
import { Injectable } from '@nestjs/common';
import { CreateIframeworkDto } from './dto/create-iframework.dto';
import { UpdateIframeworkDto } from './dto/update-iframework.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Iframework } from './entities/iframework.entity';
import { Repository } from 'typeorm';
import { omit } from 'lodash';

@Injectable()
export class IframeworksService {
  constructor(@InjectRepository(Iframework) private iframeworkRepository: Repository<Iframework>) { }
  async create(createIframeworkDto: CreateIframeworkDto): Promise<PostResponseOnlyData> {
    const iframework = await this.iframeworkRepository.save(createIframeworkDto)
    return {
      message: "IFramework created successfully",
      status: 200,
      data: iframework
    }
  }

  async findAll(): Promise<GetResponse> {
    const iframework = await this.iframeworkRepository.find({ select: ["code", "name"] })
    return {
      total: iframework.length,
      limit: DEFAULT_LIMIT,
      skip: DEFAULT_SKIP,
      data: iframework
    }
  }

  async findOne(code: string): Promise<GetResponse> {
    const iframework = await this.iframeworkRepository.findOneBy({ code })
    return {
      total: 1,
      limit: DEFAULT_LIMIT,
      skip: DEFAULT_SKIP,
      data: iframework
    }
  }

  async update(code: string, updateIframeworkDto: UpdateIframeworkDto): Promise<PatchResponseOnlyData> {
    await this.iframeworkRepository.update({ code }, updateIframeworkDto)
    const updated = await this.iframeworkRepository.findOneBy({ code })
    return {
      message: "IFramework updated successfully",
      status: 200,
      data: omit(updated, ["id"])
    }
  }

  async remove(code: string): Promise<DeleteResponse> {
    await this.iframeworkRepository.delete({ code })
    return {
      message: "IFramework deleted successfully",
      status: 200
    }
  }
}
