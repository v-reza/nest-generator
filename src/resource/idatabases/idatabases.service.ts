import { DEFAULT_LIMIT, DEFAULT_SKIP } from './../../type/constant';
import { Injectable } from '@nestjs/common';
import { CreateIdatabaseDto } from './dto/create-idatabase.dto';
import { UpdateIdatabaseDto } from './dto/update-idatabase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Idatabase } from './entities/idatabase.entity';
import { Repository } from 'typeorm';
import { DeleteResponse, GetResponse, PatchResponseOnlyData, PostResponseOnlyData } from 'src/type/response';

@Injectable()
export class IdatabasesService {
  constructor(@InjectRepository(Idatabase) private idatabaseRepository: Repository<Idatabase>) { }
  async create(createIdatabaseDto: CreateIdatabaseDto): Promise<PostResponseOnlyData> {
    const idatabase = await this.idatabaseRepository.save(createIdatabaseDto)
    return {
      message: "IDatabase created successfully",
      status: 200,
      data: idatabase
    }
  }

  async findAll(): Promise<GetResponse> {
    const idatabase = await this.idatabaseRepository.find({ select: ["code", "name"] })
    return {
      total: idatabase.length,
      limit: DEFAULT_LIMIT,
      skip: DEFAULT_SKIP,
      data: idatabase
    }
  }

  async findOne(code: string): Promise<GetResponse> {
    const idatabase = await this.idatabaseRepository.findOneBy({ code })
    return {
      total: 1,
      limit: DEFAULT_LIMIT,
      skip: DEFAULT_SKIP,
      data: idatabase
    }
  }

  async update(code: string, updateIdatabaseDto: UpdateIdatabaseDto): Promise<PatchResponseOnlyData> {
    await this.idatabaseRepository.update({ code }, updateIdatabaseDto)
    const updated = await this.idatabaseRepository.findOneBy({ code })
    return {
      message: "IDatabase updated successfully",
      status: 200,
      data: updated
    }
  }

  async remove(code: string): Promise<DeleteResponse> {
    await this.idatabaseRepository.delete({ code })
    return {
      message: "IDatabase deleted successfully",
      status: 200
    }
  }
}
