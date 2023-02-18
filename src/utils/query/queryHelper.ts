import { DataSource } from "typeorm"
import { QueryConnHelper } from "./queryConnection"

export type QueryHelperProps = {
  model: any
  queryModel: any
  queryParameter: any
  type: 'findOne' | 'find'
  throwNotFound?: boolean
}
export const QueryHelper = (props: QueryHelperProps) => {
  return new QueryConnHelper().runQuery(props)
}