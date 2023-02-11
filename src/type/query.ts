import { In, Like, MoreThan, LessThan, Equal } from 'typeorm';
import * as _ from 'lodash';

export class QueryMethod {
  constructor(public queryParameter: any) {}

  getQuery() {
    let querys = {} as any;
    _.keys(this.queryParameter).forEach((key, index) => {
      const keys = _.keys(this.queryParameter[key]);
      const method = _.get(QMethod, keys.toString());
      const value = _.get(this.queryParameter, [key, keys.toString()]);

      querys = {
        ...querys,
        [key]: method(value),
      };
    });

    return querys;
  }
}

const LikeMethod = (value: string) => {
  return Like(`%${value}%`);
};

const InMethod = (value: string) => {
  return In(value.split(','));
};

const EqualMethod = (value: string) => {
  return Equal(value);
};

const MoreThanMethod = (value: string) => {
  return MoreThan(value);
};

const LessThanMethod = (value: string) => {
  return LessThan(value);
};

export const QMethod = {
  $eq: EqualMethod,
  $gt: MoreThanMethod,
  $lt: LessThanMethod,
  $like: LikeMethod,
  $in: InMethod,
};
