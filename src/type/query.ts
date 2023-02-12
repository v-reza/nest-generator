import { In, Like, MoreThan, LessThan, Equal } from 'typeorm';
import * as _ from 'lodash';
import { ResponseError } from 'src/utils/response.list';
import {
  DEFAULT_LIMIT,
  DEFAULT_SKIP,
  NOT_QUERY_METHOD,
  ORDER_METHOD,
} from './constant';

export type Queries = {
  take?: number;
  skip?: number;
  order?: any;
};

export type QueryParameter<TypeWhere> = {
  qWhere: TypeWhere;
  qFilter: Queries;
};

export type PickQueryOrder = {
  qFilter: Pick<Queries, 'order'>;
};

export type PickQueryLimit = {
  qFilter: Pick<Queries, 'take'>;
};

export type PickQuerySkip = {
  qFilter: Pick<Queries, 'skip'>;
};

export class QueryMethod {
  constructor(public queryParameter: any) {}

  getQuery(): QueryParameter<any> {
    let queryMethod = {} as any; // [$eq], [$gt], [$lt], [$like], [$in]

    let queries = {
      take: DEFAULT_LIMIT,
      skip: DEFAULT_SKIP,
    } as Queries; // $limit, $order, $skip

    _.keys(this.queryParameter).forEach((key, index) => {
      if (key == '$order') {
        const order = _.get(this.queryParameter, key);
        _.keys(order).forEach((keyOrder) => {
          const value = _.get(order, keyOrder);
          if (!ORDER_METHOD.includes(Number(value)))
            throw new ResponseError(
              'Order method not found',
              400,
            ).getResponse();
          queries = {
            ...queries,
            order: {
              ...queries.order,
              [keyOrder]: QUERY_ORDER(value),
            },
          };
        });
      } else if (NOT_QUERY_METHOD.includes(key)) {
        const replaceKeys = key.toString().replace('$', '');
        queries = {
          ...queries,
          [replaceKeys == 'limit' ? 'take' : replaceKeys]: Number(
            this.queryParameter[key],
          ),
        };
      } else {
        const keys = _.keys(this.queryParameter[key]);
        const method = _.get(QMethod, keys.toString());
        if (!method)
          throw new ResponseError('Query Method not found', 400).getResponse();
        const value = _.get(this.queryParameter, [key, keys.toString()]);

        queryMethod = {
          ...queryMethod,
          [key]: method(value),
        };
      }
    });

    return { qWhere: queryMethod, qFilter: queries };
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

export const QUERY_ORDER = (value: number) => {
  if (value == -1) return 'DESC';
  if (value == 1) return 'ASC';
};

export const QMethod = {
  $eq: EqualMethod,
  $gt: MoreThanMethod,
  $lt: LessThanMethod,
  $like: LikeMethod,
  $in: InMethod,
};
