import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ButtonPrimary from 'components/Button/Variants/ButtonPrimary'
import TableFilterable from 'components/TableFilterable/TableFilterable'
import { Column } from 'react-table'
import JobRepository from 'Repository/jobs'
import { IJob, IJobsListRequest, IJobsListRequestParams, IJobsListResponse, _jobStatus, _jobTypes } from 'types/Jobs'
import { IRequestSearchable } from 'Repository/type'
import { useForm } from 'react-hook-form'
import Tag from 'components/Tag/Tag'
import { tagStatus, translateStatus, translateType } from 'views/Jobs/constants'
import TagButton from 'components/TagButton/TagButton'
// import JobForm from 'components/JobForm/JobForm'
import { useModalContext } from 'hooks/useModalContext'
import InputSm from 'components/Input/InputSm'
import { IUser } from 'types/Users'
import JobForm from 'components/JobForm/JobForm'
import useUser from 'hooks/useUser'

type IStateReponse = Omit<IJobsListResponse, 'data.docs'> | null

const limit = 10

function Jobs () {
  const [response, setResponse] = useState<IStateReponse>(null)
  const [docs, setDocs] = useState<IJob[]>([])
  const [loadingDocs, setLoadingDocs] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const { updateShowModal } = useModalContext()

  const scrollRef = useRef<HTMLDivElement>(null)
  const cachedParams = useRef<IJobsListRequestParams>({ page: 1, limit })

  const [focusedJob, setFocusedJob] = useState<IJob | null>(null)

  const { handleSubmit: handleSearch, register } = useForm<IRequestSearchable>()
  const { ref: searchRef, ...searchRegister } = register('search')

  const { session } = useUser()

  function editJob (job: IJob) {
    setFocusedJob(job)
    setShowForm(true)
    updateShowModal(true)
  }

  const editJobCallback = useCallback(editJob, [])

  const columns: Column<IJob>[] = useMemo(() => [
    {
      Header: 'Nome da vaga',
      accessor: 'name'
    },
    {
      Header: 'Autor',
      accessor: 'author',
      Cell: ({ value, row }: { value: IUser, row: any }) => (
        <p>{value.name}</p>
      )
    },
    {
      Header: 'Contratação',
      accessor: 'type',
      Cell: ({ value, row }: { value: _jobTypes, row: any }) => (
        <p>{translateType[value]}</p>
      )
    },
    {
      Header: 'Localização',
      accessor: 'city'
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value, row }: { value: _jobStatus, row: any }) => (
        <div className='grid gap-2 grid-cols-[100px_60px]'>
          <Tag
            type={tagStatus[value]}
          >
            {translateStatus[value]}
          </Tag>
          {session?.user?.type === 'headhunter' && (
            <TagButton
              type='ghost'
              onClick={() => editJob(row.original)}
            >
              Editar
            </TagButton>
          )}
        </div>
      )
    }
  ], [editJobCallback])

  async function getDocs (params: IJobsListRequestParams) {
    setLoadingDocs(true)

    const requestConfig: IJobsListRequest = {
      params
    }

    try {
      const reponse = await JobRepository.index(requestConfig)
      const { docs } = reponse.data
      setResponse(response)
      setDocs(docs)

      cachedParams.current = { ...cachedParams.current, ...params }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingDocs(false)
    }
  }

  useEffect(() => {
    getDocs(cachedParams.current)
  }, [])

  function getNextPage (page: number) {
    scrollRef.current?.scrollTo({ top: 0 })
    getDocs({ page, limit })
  }

  function onSearch ({ search }: IRequestSearchable) {
    getDocs({ page: 1, limit, search })
  }

  function createJob () {
    setShowForm(true)
    updateShowModal(true)
  }

  function onCancelForm () {
    setFocusedJob(null)
  }

  function onSubmitForm () {
    getDocs({ ...cachedParams.current, page: 1 })
    updateShowModal(false)
    setFocusedJob(null)
  }

  return (
    <div
      className='flex flex-col overflow-auto grow'
      ref={scrollRef}
    >
      {showForm && (
        <JobForm
          onSubmitForm={onSubmitForm}
          onCancelForm={onCancelForm}
          focusedJob={focusedJob}
        />
      )}
      <TableFilterable
        data={docs}
        columns={columns}
        loading={loadingDocs}
        getPage={getNextPage}
        hasNextPage={!!response?.data.hasNextPage}
        page={response?.data.page || 1}
        pageTotal={response?.data.totalPages || 1}
        header={
          <div className='flex justify-between p-1'>
            <form
              onSubmit={handleSearch(onSearch)}
            >
              <InputSm
                placeholder='Buscar'
                forwardedRef={searchRef}
                onKeyDown={e => e.key === 'Enter' && handleSearch(onSearch)}
                {...searchRegister}
              />
            </form>

            {session?.user?.type === 'headhunter' && (
              <ButtonPrimary onClick={createJob} className='p-2'>
                Cadastrar Vaga
              </ButtonPrimary>
            )}
          </div>
        }
      />
    </div>
  )
}

export default Jobs
