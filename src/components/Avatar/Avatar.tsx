import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

type IProps = {

} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

function Avatar ({ className, src, ...rest }: IProps) {
  return (
    <img
      className={`${className || ''} h-16 w-16 rounded-full`}
      src={src}
      {...rest}
    />
  )
}

export default Avatar
