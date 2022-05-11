import React from 'react'
import ButtonPrimary from 'components/Button/Variants/ButtonPrimary'
import ButtonSecondary from 'components/Button/Variants/ButtonSecondary'
import logo from 'assets/logo.jpg'
import Input from 'components/Input/Input'
import paths from 'router/paths'
import Link from 'components/Link/Link'
import { useForm } from 'react-hook-form'
import { ILoginForm } from 'views/Login/type'
import { useNavigate } from 'react-router-dom'

function Login () {
  const { handleSubmit, register } = useForm<ILoginForm>()

  const navigate = useNavigate()

  function onSubmit (values: ILoginForm) {
    console.log(values)
    navigate(`auth${paths.auth.home}`)
  }
  const { ref: emailRef, ...emailRegister } = register('email')
  const { ref: passwordRef, ...passwordRegister } = register('password')

  return (
    <form
      className='flex flex-col items-center justify-center h-full gap-4 grow'
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
          {...passwordRegister}
        />
        <ButtonPrimary
          className='w-full p-3'
          type='submit'
        >
          Entrar
        </ButtonPrimary>
        <ButtonSecondary
          className='w-full p-3'
        >
          Solicitar Cadastro
        </ButtonSecondary>

      </div>
      <Link to={paths.unauth.restorePassword}>
        Esqueceu a senha?
      </Link>
    </form>
  )
}

export default Login
