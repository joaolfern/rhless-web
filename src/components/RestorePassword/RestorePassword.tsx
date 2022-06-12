import useDialogContext from 'hooks/useDialogContext'
import React from 'react'

function RestorePassword () {
  const { dialog } = useDialogContext()
  return (
    <p className='text-primary' onClick={() => dialog({ content: 'Entre em contato com rhless.suporte@yopmail.com' })}>
      Esqueceu a senha?
    </p>
  )
}

export default RestorePassword
