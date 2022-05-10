import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export type IButton = {

} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

function Button ({
  className,
  ...rest
}: IButton) {
  return (
    <button
      className={`text-white font-semibold rounded ${className || ''}`}
      {...rest}
    />
  )
}

export default Button
