import { DataSource } from 'typeorm';
import { QueryHelperProps } from './queryHelper';
import { ResponseError, ResponseSuccess } from '../response.list';

export class QueryConnHelper {
  constructor() {}

  async runQuery(args: QueryHelperProps) {
    const {
      model,
      queryParameter,
      throwNotFound = true,
      type,
      queryModel,
    } = args;

    if (!model) throw new ResponseError('Model is required', 500).getResponse();
    const record = await model[type]({
      ...queryModel,
    });
    if (throwNotFound && !record) {
      throw new ResponseError('Record not found', 404).getResponse();
    }

    const count = await model.count(queryModel);
    console.log({count})
    const response = new ResponseSuccess(
      type,
      { record, count },
      queryParameter,
    );
    return response.getResponse();
  }
}
