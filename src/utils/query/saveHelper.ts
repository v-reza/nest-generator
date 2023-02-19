import * as _ from 'lodash';
import { ResponseError } from '../response.list';
type SchemaOptions = {
  loadModel: string;
};

type SaveOptions = {
  preload: boolean;
  schema: SchemaOptions;
};

export type SaveHelperProps = {
  model: any;
  id: any;
  body: any;
  relations?: string[];
  options?: SaveOptions;
};

export async function SaveHelper(props: SaveHelperProps) {
  // return new SaveConnHelper().runSave(props);
  const { model, id, body, relations, options } = props;

  if (!model) throw new ResponseError('Model is required', 500).getResponse();
  if (!id) throw new ResponseError('Id is required', 500).getResponse();
  if (!body) throw new ResponseError('Body is required', 500).getResponse();
  // console.log(props)
  const findRecord = await model.findOne({
    where: {
      id: '91cba208-cce4-4563-a1fe-f44accfa07a5'
    }
  })
  // let findRecord: any = null
  // const findRecord = await model.findOne({
  //   where: {
  //     id: id
  //   },
  //   relations: relations || []
  // })
  // if (!findRecord)
  //   throw new ResponseError('Record not found', 404).getResponse();

  // const createRecord = await model.create({ ...body });
  // console.log({createRecord})
}
