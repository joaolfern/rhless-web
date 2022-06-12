import React, { useEffect, useMemo } from 'react'
import ButtonPrimary from 'components/Button/Variants/ButtonPrimary'
import InputSm from 'components/Input/InputSm'
import Modal from 'components/Modal/Modal'
import useDialogContext from 'hooks/useDialogContext'
import { useForm } from 'react-hook-form'
import { IJob, _jobStatus } from 'types/Jobs'
import RadioGroup from 'components/RadioGroup/RadioGroup'
import { JOB_TYPE_RESOURCE } from 'resources'
import Textarea from 'components/Textarea/Textarea'
import JobRepository from 'Repository/jobs'
import useUser from 'hooks/useUser'
import JobFormStatusButton from 'components/JobForm/JobFormStatusButton'

export type IJobFormJob = Omit<Omit<Omit<IJob, '_id'>, 'author'>, 'status'> & { author: string }
interface IJobForm {
  job: IJobFormJob
}

interface IProps {
  onSubmitForm: () => void
  onCancelForm: () => void
  focusedJob: IJob | null
}

type _formMode = 'create' | 'update'

function JobForm ({ onSubmitForm, onCancelForm, focusedJob }: IProps) {
  const { handleSubmit, register, setValue, reset } = useForm<IJobForm>()
  const { session } = useUser()
  const formMode: _formMode = useMemo(() => focusedJob?._id ? 'update' : 'create', [focusedJob?._id])

  const { ref: nameRef, ...name } = register('job.name')
  const { ref: typeRef, ...type } = register('job.type')
  const { ref: cityRef, ...city } = register('job.city')
  const { ref: departmentRef, ...department } = register('job.department')
  const { ref: descriptionRef, ...description } = register('job.description')

  const { dialog } = useDialogContext()
  async function create (values: IJobForm) {
    if (session?.user?._id) values.job.author = session?.user._id

    try {
      const response = await JobRepository.create(values.job)
      dialog({ content: response.data })
      reset()
      onSubmitForm()
    } catch (err) {
      console.error(err)
      if (typeof err === 'string') dialog({ content: err })
    }
  }

  async function update (values: IJobForm) {
    if (session?.user?._id) values.job.author = session?.user._id

    try {
      const response = await JobRepository.update({ data: values.job, id: focusedJob?._id as string })
      dialog({ content: response.data })

      onSubmitForm()
    } catch (err) {
      console.error(err)
      if (typeof err === 'string') dialog({ content: err })
    }
  }

  async function updateStatus (status: _jobStatus) {
    try {
      const response = await JobRepository.updateStatus({ data: { status: status }, id: focusedJob?._id as string })
      dialog({ content: response.data })

      onSubmitForm()
    } catch (err) {
      console.error(err)
      if (typeof err === 'string') dialog({ content: err })
    }
  }

  async function onSubmit (values: IJobForm) {
    switch (formMode) {
      case 'create':
        return create(values)
      case 'update':
        return update(values)
    }
  }

  useEffect(() => {
    if (focusedJob?._id) {
      const formValue: IJobForm = {
        job: {
          createdAt: focusedJob.createdAt,
          name: focusedJob.name,
          type: focusedJob.type,
          city: focusedJob.city,
          department: focusedJob.department,
          description: focusedJob.description,
          author: focusedJob.author._id
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
            <RadioGroup
              resources={JOB_TYPE_RESOURCE}
              forwardedRef={typeRef}
              inputProps={type}
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
              Descrição
            </label>
            <Textarea
              forwardedRef={descriptionRef}
              {...description}
            />
          </div>
        </div>
        <footer className='flex justify-between p-3 pl-6 pr-6 mt-auto border-t-2 border-light-text'>
          {formMode === 'update' && focusedJob?.status && (
            <JobFormStatusButton

              updateStatus={updateStatus}
              status={focusedJob?.status}
            />
          )}
          <ButtonPrimary className='px-3 py-1 ml-auto'>
            {formMode === 'create' ? 'Cadastrar' : 'Atualizar'}
          </ButtonPrimary>
        </footer>
      </form>
    </Modal>
  )
}

export default JobForm
