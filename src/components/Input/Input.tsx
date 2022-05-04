import React, { DetailedHTMLProps } from 'react'

type IInput = {

} & DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function Input({ className, ...rest }: IInput) {
  return (
    <input
      className={`p-3 rounded outline outline-1 outline-tertiary ${className || ''}`}
      {...rest}
    />
  )
}

export default Input