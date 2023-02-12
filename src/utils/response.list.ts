import { HttpException } from '@nestjs/common';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from 'src/type/constant';
import { DataResponse } from 'src/type/response';

type TypeSuccess =
  | 'create'
  | 'update'
  | 'delete'
  | 'find'
  | 'findOne'
  | 'updateWithToken'
  | 'createWithToken';
type ResponseSuccessType = {
  message?: string;
  status?: number;
  access_token?: string;
};

export class ResponseError {
  constructor(public message: string, public status: number) {}

  getResponse() {
    return new HttpException(
      {
        status: this.status,
        message: this.message,
      },
      this.status,
    );
  }
}

export class ResponseSuccess {
  /**
   *
   * @param type 'create'| 'update' | 'delete' | 'find' | 'findOne' | 'updateWithToken' | 'createWithToken'
   * @param record data
   * @param query query parameter
   *
   */
  constructor(
    public type: TypeSuccess,
    public record?: any,
    public query?: any,
  ) {}

  /**
   *
   * @param res = { message?: string; status?: number; access_token?: string; }
   * @returns
   *
   *    create: { status: 200, message: 'Create successfully' }
   *
   *    update: { status: 200, message: 'Update successfully' }
   *
   *    delete: { status: 200, message: 'Delete successfully' }
   *
   *    find: { total: number, limit: number, skip: number, data: any[] }
   *
   *    findOne: { total: 1, limit: DEFAULT_LIMIT, skip: DEFAULT_SKIP, data: any[] }
   *
   *    updateWithToken: { status: 200, message: 'Update successfully', access_token: string }
   *
   *    createWithToken: { status: 200, message: 'Create successfully', access_token: string }
   * 
   */
  getResponse(res?: ResponseSuccessType): typeof res | DataResponse {
    switch (this.type) {
      case 'create':
        return {
          status: res.status ?? 200,
          message: res.message ?? 'Create successfully',
        };
      case 'update':
        return {
          status: res.status ?? 200,
          message: res.message ?? 'Update successfully',
        };
      case 'delete':
        return {
          status: res.status ?? 200,
          message: res.message ?? 'Delete successfully',
        };
      case 'find':
        return {
          total: this.record.length,
          limit: this.query.qFilter.take,
          skip: this.query.qFilter.skip,
          data: this.record,
        };
      case 'findOne':
        return {
          total: 1,
          limit: DEFAULT_LIMIT,
          skip: DEFAULT_SKIP,
          data: this.record,
        };
      case 'updateWithToken':
        return {
          status: res.status ?? 200,
          message: res.message ?? 'Update successfully',
          access_token: res.access_token,
        };
      case 'createWithToken':
        return {
          status: res.status ?? 200,
          message: res.message ?? 'Create successfully',
          access_token: res.access_token,
        };
      default:
        return {
          message: 'Unknown',
          status: 200,
        };
    }
  }
}

const Response = () => {};
