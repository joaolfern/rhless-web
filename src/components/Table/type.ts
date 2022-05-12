import { ITablePagination } from 'components/TablePagination/TablePagination'
import { Column } from 'react-table'

export interface ITableData {
  [key: string]: any
}

export type ITable = {
  columns: Column<any>[]
  loading: boolean
  data: ITableData[]
} & ITablePagination
