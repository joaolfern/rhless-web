import React, { useEffect, useMemo } from 'react'
import ButtonPrimary from 'components/Button/Variants/ButtonPrimary'
import InputSm from 'components/Input/InputSm'
import Modal from 'components/Modal/Modal'
import useDialogContext from 'hooks/useDialogContext'
import { useForm } from 'react-hook-form'
import { IUser } from 'types/Users'
import ButtonGhost from 'components/ButtonGhost/ButtonGhost'

interface IUserForm {
  user: {
    name: string
    picture: string
    email: string
    password: string
    confirmPassword: string
  }
}

interface IProps {
  onSubmitForm: () => void
  onCancelForm: () => void
  focusedUser: IUser| null
}

type _formMode = 'create' | 'update'

function UserForm ({ onSubmitForm, onCancelForm, focusedUser }: IProps) {
  const { handleSubmit, register, setValue, reset } = useForm<IUserForm>()

  const formMode: _formMode = useMemo(() => focusedUser?._id ? 'update' : 'create', [focusedUser?._id])

  const { ref: nameRef, ...name } = register('user.name')
  // const {ref: pictureRef, ...picture} = register('picture')
  const { ref: emailRef, ...email } = register('user.email')
  const { ref: passwordRef, ...password } = register('user.password')
  const { ref: confirmPasswordRef, ...confirmPassword } = register('user.confirmPassword')

  const { dialog } = useDialogContext()

  function onSubmit (values: IUserForm) {
    try {
      onSubmitForm()
      dialog({ content: 'Cadastro realizado com sucesso' })
      reset()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (focusedUser?._id) {
      const formValue: IUserForm = {
        user: {
          email: focusedUser.email,
          name: focusedUser.name,
          picture: focusedUser.picture,
          password: '',
          confirmPassword: ''
        }
      }
      setValue('user', formValue.user)
    }
  }, [focusedUser?._id])

  return (
    <Modal
      title={`${formMode === 'create' ? 'Cadastrar' : 'Atualizar'} usuário`}
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
          {formMode === 'create' && (
            <>
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
            </>
          )}
        </div>
        <footer className='flex justify-between p-3 pl-6 pr-6 mt-auto border-t-2 border-light-text'>
          {formMode === 'update' && (
            <ButtonGhost className='pt-1 pb-1 pl-3 pr-3'>
              Bloquear
            </ButtonGhost>
          )}
          <ButtonPrimary className='pt-1 pb-1 pl-3 pr-3 ml-auto'>
            {formMode === 'create' ? 'Cadastrar' : 'Atualizar'}
          </ButtonPrimary>
        </footer>
      </form>
    </Modal>
  )
}

export default UserForm
