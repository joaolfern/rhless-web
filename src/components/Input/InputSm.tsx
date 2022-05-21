import Input, { IInput } from 'components/Input/Input'
import React from 'react'

function InputSm ({ ...rest } :IInput) {
  return (
    <Input
      className='p-2'
      {...rest}
    />
  )
}

export default InputSm
