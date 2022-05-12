import React from 'react'
import { ITable } from 'components/Table/type'
import { useTable } from 'react-table'
import TablePagination from 'components/TablePagination/TablePagination'

function Table ({ data, columns, loading, ...pagination }: ITable) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ data, columns })

  return (
    <div className='flex flex-col'>
      <table
        {...getTableProps()}
        className=' bg-background'
      >
        <thead>
          {headerGroups.map(headerGroup => {
            const headerGroupProps = headerGroup.getHeaderGroupProps()
            return (
              <tr
                {...headerGroupProps}
                key={headerGroupProps.key}
                className='border-b-2 border-light-text'
              >
                {headerGroup.headers.map((column, idx) => {
                  const headerProps = column.getHeaderProps()
                  return (
                    <th {...headerProps} key={headerProps.key} >
                      {column.render('Header')}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody
          {...getTableBodyProps()}
        >
          {rows.map(row => {
            prepareRow(row)
            const rowProps = row.getRowProps()
            return (
              <tr
                {...rowProps}
                key={rowProps.key}
                className='border-b-2 border-light-text'
              >
                {row.cells.map(cell => {
                  const cellProps = cell.getCellProps()
                  return (
                    <td {...cellProps} key={cellProps.key}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <TablePagination
        {...pagination}
      />
    </div>
  )
}

export default Table
