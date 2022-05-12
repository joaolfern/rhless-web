import Tag, { ITag } from 'components/Tag/Tag'
import React from 'react'

function TagButton ({ className, ...rest }: ITag) {
  return (
    <Tag
      {...rest}
      className={`${className || ''} cursor-pointer select-none`}
    />
  )
}

export default TagButton
