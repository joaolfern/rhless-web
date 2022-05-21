import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export type IButton = {

} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

function ButtonGhost ({
  className,
  ...rest
}: IButton) {
  return (
    <button
      className={`text-light-text border-light-text border-2 font-semibold rounded ${className || ''}`}
      {...rest}
    />
  )
}

export default ButtonGhost
