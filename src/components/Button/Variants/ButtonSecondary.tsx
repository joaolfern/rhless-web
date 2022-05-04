import Button, { IButton } from 'components/Button/Button'
import React from 'react'

type IButtonSecondary = {

} & IButton

function ButtonSecondary ({ className, ...rest }: IButtonSecondary) {
  return (
    <Button
      className={`bg-secondary ${className || ''}`}
      {...rest}
    />
  )
}

export default ButtonSecondary
