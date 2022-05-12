import TablePaginationButton from 'components/TablePaginationButton/TablePaginationButton'
import React from 'react'

export type ITablePagination = {
  page: number
  pageTotal: number
  hasNextPage: boolean
  getPage: (page: number) => void
}

function TablePagination ({ page, pageTotal, hasNextPage, getPage } : ITablePagination) {
  return (
    <div className='flex items-center gap-2 pt-3 ml-auto'>
      <TablePaginationButton
        onClick={() => getPage(page - 1)}
        disabled={page <= 1}
      >
        {'<'}
      </TablePaginationButton>
      <TablePaginationButton
        onClick={() => getPage(page + 1)}
        disabled={!hasNextPage}
      >
        {'>'}
      </TablePaginationButton>
      <span className='flex items-center gap-1'>
        Página
        <strong>
          {page} de {pageTotal}
        </strong>
      </span>
    </div>
  )
}

export default TablePagination
