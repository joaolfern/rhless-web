import React, { useEffect, useMemo, useRef, useState } from 'react'
import TableFilterable from 'components/TableFilterable/TableFilterable'
import { Column } from 'react-table'
import CandidateRepository from 'Repository/candidates'
import { ICandidate, ICandidatesListRequest, ICandidatesListRequestParams, ICandidatesListResponse, _candidateStatus } from 'types/Candidates'
import { IRequestSearchable } from 'Repository/type'
import { useForm } from 'react-hook-form'
import Tag from 'components/Tag/Tag'
import { translateStatus } from 'views/Candidates/constants'
import InputSm from 'components/Input/InputSm'
import candidatesMock from 'views/Candidates/mock'
import { BiEdit } from 'react-icons/bi'
import Dropdown from 'components/Dropdown/Dropdown'

type IStateReponse = Omit<ICandidatesListResponse, 'data.docs'> | null

const limit = 10

function Candidates () {
  const [response, setResponse] = useState<IStateReponse>(null)
  const [docs, setDocs] = useState<ICandidate[]>([])
  const [loadingDocs, setLoadingDocs] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const cachedParams = useRef<ICandidatesListRequestParams>({ page: 1, limit })

  const { handleSubmit: handleSearch, register } = useForm<IRequestSearchable>()
  const { ref: searchRef, ...searchRegister } = register('search')

  const columns: Column<ICandidate & { 'user.name': string, 'author.name': string, 'job.name': string, 'job.city': string }>[] = useMemo(() => [
    {
      Header: 'Candidato',
      accessor: 'user.name'
    },
    {
      Header: 'Autor',
      accessor: 'author.name'
    },
    {
      Header: 'Vaga',
      accessor: 'job.name'
    },
    {
      Header: 'Localização',
      accessor: 'job.city'
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value, row }: { value: _candidateStatus, row: any }) => (
        <div className='grid gap-2 grid-cols-[100px_60px]'>
          <Tag
            type='secondary'
          >
            {translateStatus[value]}
          </Tag>
          <BiEdit />
          {/* <Dropdown options={[
            { label: 'Aprovar', onClick: () => {} }
          ]}>
          </Dropdown> */}
        </div>
      )
    }
  ], [])

  async function getDocs (params: ICandidatesListRequestParams) {
    setLoadingDocs(true)
    setDocs(candidatesMock)

    const requestConfig: ICandidatesListRequest = {
      params
    }

    try {
      const reponse = await CandidateRepository.index(requestConfig)
      const { docs } = reponse.data
      setResponse(response)
      setDocs(prev => {
        if (requestConfig.params.page === 1) return docs
        return [...prev, ...docs]
      })

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

  function onSearch (values: IRequestSearchable) {
    console.log('search', values)
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
        hasNextPage={!!response?.data.hasNextPage}
        page={response?.data.page || 1}
        pageTotal={response?.data.pageTotal || 1}
        header={
          <div className='flex justify-between p-1'>
            <form
              onSubmit={handleSearch(onSearch)}
            >
              <InputSm
                placeholder='Buscar'
                forwardedRef={searchRef}
                {...searchRegister}
              />
            </form>
          </div>
        }
      />
    </div>
  )
}

export default Candidates
