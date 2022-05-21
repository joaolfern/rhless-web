import ButtonPrimary from 'components/Button/Variants/ButtonPrimary'
import InputSm from 'components/Input/InputSm'
import Modal from 'components/Modal/Modal'
import useDialogContext from 'hooks/useDialogContext'
import React from 'react'
import { useForm } from 'react-hook-form'

interface IUserForm {
  name: string
  image: string
  email: string
  password: string
  confirmPassword: string
}

interface IProps {
  onSubmitForm: () => void
  onCancelForm: () => void
}

function UserForm ({ onSubmitForm, onCancelForm }: IProps) {
  const { handleSubmit, register } = useForm<IUserForm>()

  const { ref: nameRef, ...name } = register('name')
  // const {ref: imageRef, ...image} = register('image')
  const { ref: emailRef, ...email } = register('email')
  const { ref: passwordRef, ...password } = register('password')
  const { ref: confirmPasswordRef, ...confirmPassword } = register('confirmPassword')

  const { dialog } = useDialogContext()

  function onSubmit (values: IUserForm) {
    try {
      onSubmitForm()
      dialog({ content: 'Cadastro realizado com sucesso' })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Modal
      title='Cadastrar Usuário'
      onCancel={onCancelForm}
    >
      <form
        className='flex flex-col grow'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-6 p-6'>
          <div className='flex flex-col'>
            <label htmlFor='name'>
              Nome
            </label>
            <InputSm
              forwardedRef={nameRef}
              {...name}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='email'>
              Email
            </label>
            <InputSm
              forwardedRef={emailRef}
              {...email}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password'>
              Senha
            </label>
            <InputSm
              forwardedRef={passwordRef}
              {...password}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='confirmPassword'>
              Confirmar Senha
            </label>
            <InputSm
              forwardedRef={confirmPasswordRef}
              {...confirmPassword}
            />
          </div>
        </div>
        <footer className='flex p-3 pl-6 pr-6 mt-auto border-t-2 border-light-text'>
          <ButtonPrimary className='pt-1 pb-1 pl-3 pr-3 ml-auto'>
            Cadastrar
          </ButtonPrimary>
        </footer>
      </form>
    </Modal>
  )
}

export default UserForm
