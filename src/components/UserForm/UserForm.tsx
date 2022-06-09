import React, { useEffect, useMemo } from 'react'
import ButtonPrimary from 'components/Button/Variants/ButtonPrimary'
import InputSm from 'components/Input/InputSm'
import Modal from 'components/Modal/Modal'
import useDialogContext from 'hooks/useDialogContext'
import { useForm } from 'react-hook-form'
import { IUser, _userStatus } from 'types/Users'
import UserRepository from 'Repository/users'
import { IUserForm } from 'components/UserForm/types'
import { USER_TYPE_RESOURECE } from 'resources'
import { tagStatus, translateStatus } from 'views/Users/constants'
import Tag from 'components/Tag/Tag'
import RadioGroup from 'components/RadioGroup/RadioGroup'

interface IProps {
  onSubmitForm: () => void
  onCancelForm: () => void
  focusedUser: IUser| null
}

type _formMode = 'create' | 'update'

function UserForm ({ onSubmitForm, onCancelForm, focusedUser }: IProps) {
  const { handleSubmit, register, setValue } = useForm<IUserForm>()

  const formMode: _formMode = useMemo(() => focusedUser?._id ? 'update' : 'create', [focusedUser?._id])

  const { ref: nameRef, ...name } = register('user.name')
  const { ref: pictureRef, ...picture } = register('user.picture')
  const { ref: emailRef, ...email } = register('user.email')
  const { ref: passwordRef, ...password } = register('user.password')
  const { ref: confirmPasswordRef, ...confirmPassword } = register('user.confirmPassword')
  const { ref: typeRef, ...type } = register('user.type')

  const { dialog } = useDialogContext()

  async function create (values: IUserForm) {
    try {
      const response = await UserRepository.create(values.user)
      dialog({ content: response.data })

      onSubmitForm()
    } catch (err) {
      console.error(err)
      if (typeof err === 'string') dialog({ content: err })
    }
  }

  async function update (values: IUserForm) {
    try {
      const response = await UserRepository.update({ data: values.user, id: focusedUser?._id as string })
      dialog({ content: response.data })

      onSubmitForm()
    } catch (err) {
      console.error(err)
      if (typeof err === 'string') dialog({ content: err })
    }
  }

  async function updateStatus (status: _userStatus) {
    try {
      const response = await UserRepository.updateStatus({ data: { status: status }, id: focusedUser?._id as string })
      dialog({ content: response.data })

      onSubmitForm()
    } catch (err) {
      console.error(err)
      if (typeof err === 'string') dialog({ content: err })
    }
  }

  async function block (id: string) {
    try {
      const response = await UserRepository.block({ id: id })
      dialog({ content: response.data })

      onSubmitForm()
    } catch (err) {
      console.error(err)
      if (typeof err === 'string') dialog({ content: err })
    }
  }

  async function onSubmit (values: IUserForm & { eventType?: 'submit' | 'block' }) {
    if (values.eventType === 'block' && values.user._id) return block(values.user._id)

    switch (formMode) {
      case 'create':
        return create(values)
      case 'update':
        return update(values)
    }
  }

  useEffect(() => {
    if (focusedUser?._id) {
      const formValue: IUserForm = {
        user: {
          _id: focusedUser?._id,
          email: focusedUser.email,
          name: focusedUser.name,
          picture: focusedUser.picture,
          password: '',
          confirmPassword: '',
          type: focusedUser.type,
          status: focusedUser?.status
        }
      }
      setValue('user', formValue.user)
    }
  }, [focusedUser?._id])

  function showStatusUpdateDialog () {
    dialog({
      content: (
        <div className='flex flex-col w-full gap-3'>
          <h3 className='ml-auto'><b>Atualizar status:</b></h3>
          {Object.entries(translateStatus).map(([key, value]) => (
            <Tag
              key={key}
              className='box-content px-3 py-1 cursor-pointer'
              type={tagStatus[key as _userStatus]}
              onClick={() => updateStatus(key as _userStatus)}
              onKeyDown={e => e.key === 'Enter' && updateStatus(key as _userStatus)}
            >
              {value}
            </Tag>
          ))}
        </div>
      )
    })
  }

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
          <div className='flex flex-col '>
            <label>
              Tipo
            </label>
            <RadioGroup
              resources={USER_TYPE_RESOURECE}
              forwardedRef={typeRef}
              inputProps={type}
            />
          </div>
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
            <label>
              Foto de perfil
            </label>
            <InputSm
              forwardedRef={pictureRef}
              {...picture}
            />
          </div>
          {formMode === 'create' && (
            <>
              <div className='flex flex-col'>
                <label htmlFor='password'>
                  Senha
                </label>
                <InputSm
                  type='password'
                  forwardedRef={passwordRef}
                  {...password}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='confirmPassword'>
                  Confirmar Senha
                </label>
                <InputSm
                  type='password'
                  forwardedRef={confirmPasswordRef}
                  {...confirmPassword}
                />
              </div>
            </>
          )}
        </div>
        <footer className='flex flex-wrap justify-between gap-3 p-3 pl-6 pr-6 mt-auto overflow-hidden border-t-2 border-light-text '>
          {formMode === 'update' && focusedUser?.status && (
            <Tag
              className='box-content px-3 py-1 cursor-pointer'
              type={tagStatus[focusedUser?.status]}
              onClick={() => showStatusUpdateDialog()}
              onKeyDown={e => e.key === 'Enter' && showStatusUpdateDialog()}
            >
              {translateStatus[focusedUser?.status]}
            </Tag>
          )}
          <ButtonPrimary
            className='px-3 py-1 ml-auto'
            type='submit'
          >
            {formMode === 'create' ? 'Cadastrar' : 'Atualizar'}
          </ButtonPrimary>
        </footer>
      </form>
    </Modal>
  )
}

export default UserForm
