import React from 'react'

export type _tagTypes = 'primary' | 'secondary' | 'ghost' | 'red' |'yellow'

const typesColors: {[key in _tagTypes ]: string} = {
  primary: '',
  secondary: 'bg-secondary font-bold text-white',
  ghost: 'border-2 border-light-text text-light-text',
  red: 'bg-red-500 text-white',
  yellow: 'bg-yellow-500'
}

export type ITag = {
  className?: string
  type: _tagTypes
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

function Tag ({ className, type, ...rest }: ITag) {
  return (
    <div
      className={`
        rounded text-center leading-none h-6 flex items-center justify-center font-bold
        ${className || ''}
        ${typesColors[type]}
      `}
      {...rest}
    />
  )
}

export default Tag
