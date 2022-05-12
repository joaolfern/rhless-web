import React from 'react'

type ITablePaginationButton = {
  className?: string
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

function TablePaginationButton ({ className, ...rest }: ITablePaginationButton) {
  return (
    <button
      className={`${className || ''}
        p-2 border-2 border-secondary text-secondary font-bold rounded-lg cursor-pointer
        disabled:border-light-text disabled:text-light-text
      `}
      {...rest}
    />
  )
}

export default TablePaginationButton
