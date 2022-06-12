import React, { useEffect, useMemo, useRef, useState } from 'react'
import TableFilterable from 'components/TableFilterable/TableFilterable'
import { Column } from 'react-table'
import CandidateRepository from 'Repository/candidates'
import { ICandidate, ICandidatesListRequest, ICandidatesListRequestParams, _candidateStatus } from 'types/Candidates'
import Tag from 'components/Tag/Tag'
import { tagStatus, translateStatus } from 'views/Candidates/constants'
import { HiDocumentText } from 'react-icons/hi'
import TagButton from 'components/TagButton/TagButton'
import useDialogContext from 'hooks/useDialogContext'
import { IResponsePaginatedState } from 'Repository/type'

const limit = 10

function Candidates () {
  const [response, setResponse] = useState<IResponsePaginatedState<ICandidate> | null>(null)
  const [docs, setDocs] = useState<ICandidate[]>([])
  const [loadingDocs, setLoadingDocs] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const cachedParams = useRef<ICandidatesListRequestParams>({ page: 1, limit })

  const { dialog } = useDialogContext()

  async function getDocs (params: ICandidatesListRequestParams) {
    setLoadingDocs(true)

    const requestConfig: ICandidatesListRequest = {
      params
    }

    try {
      const reponse = await CandidateRepository.index(requestConfig)
      const { docs, ...rest } = reponse.data
      setResponse(rest as IResponsePaginatedState<ICandidate> | null)
      setDocs(docs)

      cachedParams.current = { ...cachedParams.current, ...params }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingDocs(false)
    }
  }

  async function updateStatus ({ candidate, status }: { candidate: ICandidate, status: _candidateStatus }) {
    try {
      const response = await CandidateRepository.updateStatus({ data: { status: status, job: candidate.job._id }, id: candidate._id })
      getDocs({ ...cachedParams.current })

      dialog({ content: response.data })
    } catch (err) {
      console.error(err)
      if (typeof err === 'string') dialog({ content: err })
    }
  }

  function showStatusUpdateDialog (candidate: ICandidate) {
    dialog({
      content: (
        <div className='flex flex-col w-full gap-3'>
          <h3 className='ml-auto'><b>Atualizar status:</b></h3>
          {Object.entries(translateStatus).map(([key, value]) => (
            <Tag
              key={key}
              className='box-content px-3 py-1 cursor-pointer'
              type={tagStatus[key as _candidateStatus]}
              onClick={() => updateStatus({ candidate, status: key as _candidateStatus })}
              onKeyDown={e => e.key === 'Enter' && updateStatus({ candidate, status: key as _candidateStatus })}
            >
              {value}
            </Tag>
          ))}
        </div>
      )
    })
  }

  const columns: Column<ICandidate & { 'user.name': string, 'job.name': string, 'user.resume': string }>[] = useMemo(() => [
    {
      Header: 'Vaga',
      accessor: 'job.name'
    },
    {
      Header: 'Candidato',
      accessor: 'user.name'
    },
    {
      Header: 'Currículo',
      accessor: 'user.resume',
      Cell: ({ value, row }: { value: string, row: any }) => (
        <a
          href={value}
          className='text-xl cursor-pointer text-secondary'
          target='_blank' rel="noreferrer"
        >
          <HiDocumentText />
        </a >
      )
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value, row }: { value: _candidateStatus, row: any }) => (
        <div className='grid gap-2 grid-cols-[100px_60px]'>
          <Tag
            type={tagStatus[value]}
          >
            {translateStatus[value]}
          </Tag>
          <TagButton
            type='ghost'
            onClick={() => showStatusUpdateDialog(row.original)}
          >
            Editar
          </TagButton>
        </div>
      )
    }
  ], [])

  useEffect(() => {
    getDocs(cachedParams.current)
  }, [])

  function getNextPage (page: number) {
    scrollRef.current?.scrollTo({ top: 0 })
    getDocs({ page, limit })
  }

  return (
    <div
      className='flex flex-col overflow-auto grow'
      ref={scrollRef}
    >
      <TableFilterable
        data={docs}
        columns={columns}
        loading={loadingDocs}
        getPage={getNextPage}
        hasNextPage={!!response?.hasNextPage}
        page={response?.page || 1}
        pageTotal={response?.totalPages || 1}
        header={
          <div className='flex justify-between p-1'>
            {/* <form
              onSubmit={handleSearch(onSearch)}
            >
              <InputSm
                placeholder='Buscar'
                forwardedRef={searchRef}
                {...searchRegister}
              />
            </form> */}
          </div>
        }
      />
    </div>
  )
}

export default Candidates
