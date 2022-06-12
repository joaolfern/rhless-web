import React, { useState } from 'react'
import ButtonPrimary from 'components/Button/Variants/ButtonPrimary'
import ButtonSecondary from 'components/Button/Variants/ButtonSecondary'
import logo from 'assets/logo.jpg'
import Input from 'components/Input/Input'
import paths from 'router/paths'
import Link from 'components/Link/Link'
import { useForm } from 'react-hook-form'
import { ILoginForm } from 'views/Login/type'
import { useNavigate } from 'react-router-dom'
import CreateAccountForm from 'components/CreateAccountForm/CreateAccountForm'
import { useModalContext } from 'hooks/useModalContext'
import useDialogContext from 'hooks/useDialogContext'
import UserRepository from 'Repository/users'
import useUser from 'hooks/useUser'
import RestorePassword from 'components/RestorePassword/RestorePassword'

function UserLogin () {
  const { handleSubmit, register } = useForm<ILoginForm>()
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false)
  const { updateShowModal } = useModalContext()
  const { saveSession } = useUser()
  const { dialog } = useDialogContext()
  const navigate = useNavigate()

  async function onSubmit (values: ILoginForm) {
    try {
      const response = await UserRepository.login(values)
      const { token, user } = response.data

      saveSession({ token, user })

      const initialPath = user.type === 'candidate'
        ? paths.unauth.feed
        : `/auth${paths.auth.home}`

      navigate(initialPath)
    } catch (e) {
      if (typeof e === 'string') dialog({ content: String(e) })
      console.log(e)
    }
  }

  const { ref: emailRef, ...emailRegister } = register('email')
  const { ref: passwordRef, ...passwordRegister } = register('password')

  function updateShowCreateAccountModal (value: boolean) {
    updateShowModal(value)
    setShowCreateAccountModal(value)
  }

  return (
    <div className='flex flex-col h-full '>
      {showCreateAccountModal && (
        <CreateAccountForm
          onCancelForm={() => updateShowCreateAccountModal(false)}
          onSubmitForm={() => updateShowCreateAccountModal(false)}
        />
      )}
      <form
        className='flex flex-col items-center justify-center gap-4 grow'
        onSubmit={handleSubmit(onSubmit)}
      >
        <img
          src={logo}
        />
        <div className='flex flex-col items-center w-full max-w-sm gap-4 p-5'>
          <Input
            className='w-full'
            placeholder='Informe seu email'
            forwardedRef={emailRef}
            {...emailRegister}
          />
          <Input
            className='w-full'
            placeholder='Informe sua senha'
            forwardedRef={passwordRef}
            type='password'
            {...passwordRegister}
          />
          <ButtonPrimary
            className='w-full p-3'
            type='submit'
          >
            Entrar
          </ButtonPrimary>
          <ButtonSecondary
            type='button'
            className='w-full p-3'
            onClick={() => updateShowCreateAccountModal(true)}
            onKeyDown={(e) => e.key === 'Enter' && updateShowCreateAccountModal(true)}
          >
            Cadastrar-se
          </ButtonSecondary>
        </div>
        <RestorePassword />
      </form>
      <div className='flex flex-wrap justify-between'>
        <Link
          className='m-5 font-semibold text-secondary'
          to={paths.unauth.feed}
        >
          Vagas
        </Link>
        <Link
          className='m-5 font-semibold text-primary'
          to={paths.unauth.login}
        >
          Entrar como recrutador
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
