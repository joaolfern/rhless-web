import React from 'react'
import ButtonPrimary from 'components/Button/Variants/ButtonPrimary'
import InputSm from 'components/Input/InputSm'
import Modal from 'components/Modal/Modal'
import { useForm } from 'react-hook-form'
import { ICreateAccountForm } from 'components/CreateAccountForm/type'
import useDialogContext from 'hooks/useDialogContext'
import UserRepository from 'Repository/users'

interface IProps {
  onSubmitForm: () => void
  onCancelForm: () => void
}

function CreateAccountForm ({ onSubmitForm, onCancelForm }: IProps) {
  const { handleSubmit, register, reset } = useForm<ICreateAccountForm>()
  const { ref: nameRef, ...name } = register('name')
  const { ref: pictureRef, ...picture } = register('picture')
  const { ref: emailRef, ...email } = register('email')
  const { ref: resumeRef, ...resume } = register('resume')
  const { ref: passwordRef, ...password } = register('password')
  const { ref: confirmPasswordRef, ...confirmPassword } = register('confirmPassword')

  const { dialog } = useDialogContext()

  async function onSubmit (values: ICreateAccountForm) {
    values.status = 'active'
    values.type = 'candidate'

    try {
      await UserRepository.register(values)

      onSubmitForm()
      dialog({ content: 'Cadastro realizado com sucesso. Entre com sua conta agora.' })
      reset()
    } catch (err) {
      if (typeof err === 'string') dialog({ content: err })
      console.error(err)
    }
  }

  return (
    <Modal
      title={'Solicitar cadastro'}
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
              type='email'
              {...email}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='picture'>
              Foto de perfil
            </label>
            <InputSm
              forwardedRef={pictureRef}
              {...picture}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='email'>
              Currículo
            </label>
            <InputSm
              forwardedRef={resumeRef}
              {...resume}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password'>
              Senha
            </label>
            <InputSm
              forwardedRef={passwordRef}
              type='password'
              {...password}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='confirmPassword'>
              Confirmar Senha
            </label>
            <InputSm
              forwardedRef={confirmPasswordRef}
              type='password'
              {...confirmPassword}
            />
          </div>
        </div>
        <footer className='flex justify-between p-3 pl-6 pr-6 mt-auto border-t-2 border-light-text'>
          <ButtonPrimary className='pt-1 pb-1 pl-3 pr-3 ml-auto'>
            Enviar
          </ButtonPrimary>
        </footer>
      </form>
    </Modal>
  )
}

export default CreateAccountForm
