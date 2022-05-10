import Button, { IButton } from 'components/Button/Button'
import React from 'react'

type IButonPrimary = {

} & IButton

function ButtonPrimary ({ className, ...rest }: IButonPrimary) {
  return (
    <Button
      className={`bg-primary ${className || ''}`}
      {...rest}
    />
  )
}

export default ButtonPrimary
