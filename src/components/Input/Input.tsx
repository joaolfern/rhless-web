import React, { DetailedHTMLProps } from 'react'

export type IInput = {
  forwardedRef?: React.Ref<HTMLInputElement>
} & DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function Input ({ className, forwardedRef, ...rest }: IInput) {
  return (
    <input
      ref={forwardedRef}
      className={`p-3 rounded outline outline-1 outline-tertiary ${className || ''}`}
      {...rest}
    />
  )
}

export default Input
