import React from 'react'

type _TagTypes = 'secondary' | 'ghost'

const typesColors: {[key in _TagTypes ]: string} = {
  secondary: 'bg-secondary font-bold text-white',
  ghost: 'border-2 border-light-text text-light-text'
}

export type ITag = {
  className?: string
  type: _TagTypes
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

function Tag ({ className, type, ...rest }: ITag) {
  return (
    <div
      className={`
        rounded text-center leading-none h-6 flex items-center justify-center
        ${className || ''}
        ${typesColors[type]}
      `}
      {...rest}
    />
  )
}

export default Tag
