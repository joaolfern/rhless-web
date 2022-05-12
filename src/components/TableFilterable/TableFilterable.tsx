import Table from 'components/Table/Table'
import { ITable } from 'components/Table/type'
import React, { ReactNode } from 'react'

type ITableFilterale = {
  header: ReactNode
} & ITable

function TableFilterable ({ header, ...table }: ITableFilterale) {
  return (
    <div className='flex flex-col p-3 border-2 border-light-text grow bg-background'>
      {header}
      <Table
        {...table}
      />
    </div>
  )
}

export default TableFilterable
