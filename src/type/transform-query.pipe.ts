import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { QueryMethod } from './query';

@Injectable()
export class TransformQueryPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const queryMethod = new QueryMethod(value).getQuery()
    return queryMethod;
  }
}