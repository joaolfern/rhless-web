import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

type IProps = {

} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

function Avatar({ className, ...rest }: IProps) {
  return (
    <img
      className={`${className || ''} h-16 w-16 rounded-full`}
      {...rest}
    />
  )
}

export default Avatar
