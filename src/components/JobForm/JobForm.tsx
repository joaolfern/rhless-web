import React, { useEffect, useMemo } from 'react'
import ButtonPrimary from 'components/Button/Variants/ButtonPrimary'
import InputSm from 'components/Input/InputSm'
import Modal from 'components/Modal/Modal'
import useDialogContext from 'hooks/useDialogContext'
import { useForm } from 'react-hook-form'
import { IJob } from 'types/Jobs'
import ButtonGhost from 'components/ButtonGhost/ButtonGhost'

interface IJobForm {
  job: Omit<Omit<Omit<IJob, '_id'>, 'author'>, 'status'>
}

interface IProps {
  onSubmitForm: () => void
  onCancelForm: () => void
  focusedJob: IJob | null
}

type _formMode = 'create' | 'update'

function JobForm ({ onSubmitForm, onCancelForm, focusedJob }: IProps) {
  const { handleSubmit, register, setValue, reset } = useForm<IJobForm>()

  const formMode: _formMode = useMemo(() => focusedJob?._id ? 'update' : 'create', [focusedJob?._id])

  const { ref: nameRef, ...name } = register('job.name')
  const { ref: typeRef, ...type } = register('job.type')
  const { ref: cityRef, ...city } = register('job.city')
  const { ref: departmentRef, ...department } = register('job.department')
  const { ref: descriptionRef, ...description } = register('job.description')

  const { dialog } = useDialogContext()

  function onSubmit (values: IJobForm) {
    try {
      onSubmitForm()
      dialog({ content: 'Cadastro realizado com sucesso' })
      reset()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (focusedJob?._id) {
      const formValue: IJobForm = {
        job: {
          name: focusedJob.name,
          type: focusedJob.type,
          city: focusedJob.city,
          department: focusedJob.department,
          description: focusedJob.description
        }
      }
      setValue('job', formValue.job)
    }
  }, [focusedJob?._id])

  return (
    <Modal
      title={`${formMode === 'create' ? 'Cadastrar' : 'Atualizar'} vaga`}
      onCancel={onCancelForm}
    >
      <form
        className='flex flex-col grow'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-6 p-6'>
          <div className='flex flex-col'>
            <label htmlFor='name'>
              Nome da vaga
            </label>
            <InputSm
              forwardedRef={nameRef}
              {...name}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='type'>
              Contratação
            </label>
            <InputSm
              forwardedRef={typeRef}
              {...type}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='city'>
              Localização
            </label>
            <InputSm
              forwardedRef={cityRef}
              {...city}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='department'>
              Departamento
            </label>
            <InputSm
              forwardedRef={departmentRef}
              {...department}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='description'>
              Atribuições e Requisitos
            </label>
            <InputSm
              forwardedRef={descriptionRef}
              {...description}
            />
          </div>
        </div>
        <footer className='flex justify-between p-3 pl-6 pr-6 mt-auto border-t-2 border-light-text'>
          {formMode === 'update' && (
            <ButtonGhost className='pt-1 pb-1 pl-3 pr-3'>
              Desativar
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

export default JobForm
