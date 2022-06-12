import JobCard from 'components/JobCard/JobCard'
import React, { useEffect, useRef, useState } from 'react'
import JobRepository from 'Repository/jobs'
import { IJob, IJobsListRequest, IJobsListRequestParams } from 'types/Jobs'
import logo from 'assets/logo.jpg'
import AccountFeedLabel from 'components/AccountFeedLabel/AccountFeedLabel'
import { useForm } from 'react-hook-form'
import { IRequestSearchable, IResponsePaginatedState } from 'Repository/type'
import InputSm from 'components/Input/InputSm'
import InfiniteScroll from 'react-infinite-scroll-component'
import useDialogContext from 'hooks/useDialogContext'

const limit = 10

function Feed () {
  const { dialog } = useDialogContext()

  const [loadingJobs, setLoadingJobs] = useState(false)
  const [response, setResponse] = useState<IResponsePaginatedState<IJob> | null>(null)
  const [docs, setDocs] = useState<IJob[]>([])
  const cachedParams = useRef<IJobsListRequestParams>({ page: 1, limit })

  const { handleSubmit: handleSearch, register } = useForm<IRequestSearchable>()
  const { ref: searchRef, ...searchRegister } = register('search')

  async function getDocs (params: IJobsListRequestParams) {
    const requestConfig: IJobsListRequest = {
      params
    }
    setLoadingJobs(true)
    try {
      const reponse = await JobRepository.feed(requestConfig)
      const { docs } = reponse.data
      setResponse(reponse.data)
      setDocs(prev => {
        if (params.page === 1) return docs
        return [...prev, ...docs]
      })

      cachedParams.current = { ...cachedParams.current, ...params }
    } catch (err) {
      console.error(err)
      if (typeof err === 'string') dialog({ content: err })
    } finally {
      setLoadingJobs(false)
    }
  }

  useEffect(() => {
    getDocs(cachedParams.current)
  }, [])

  function onSearch ({ search }: IRequestSearchable) {
    getDocs({ page: 1, limit, search })
  }

  function getNextPage () {
    const page = cachedParams.current.page + 1
    getDocs({ ...cachedParams.current, page: page })
    cachedParams.current = { ...cachedParams.current, page: page }
  }

  return (
    <div className='flex flex-col items-center max-w-5xl gap-4 m-auto'>
      <div className='mx-4 mt-4 ml-auto'>
        <AccountFeedLabel />
      </div>

      <img
        className='w-[200px]'
        src={logo}
      />
      <div className='flex flex-col w-full grow'>
        <div className='flex justify-between w-full p-1'>
          <form
            className='w-full px-2 md:px-0'
            onSubmit={handleSearch(onSearch)}
          >
            <InputSm
              className='w-full'
              placeholder='Buscar'
              forwardedRef={searchRef}
              onKeyDown={e => e.key === 'Enter' && handleSearch(onSearch)}
              {...searchRegister}
            />
          </form>
        </div>

        <p className='px-3 ml-auto text-light-text'>
          {response?.totalDocs || 0} vagas encontradas
        </p>
      </div>

      {!docs?.length && loadingJobs && (
        'Buscando...'
      )}

      <InfiniteScroll
        className='md:border-x-[1px] border-b-[1px] border-gray-200 w-full'
        dataLength={docs.length}
        next={getNextPage}
        hasMore={!!response?.hasNextPage}
        loader={<h4>Buscando...</h4>}
      >
        {docs.map(job => (
          <JobCard
            key={job._id + JSON.stringify(cachedParams.current) + JSON.stringify(response)}
            job={job}
          />
        ))}
      </InfiniteScroll>
      <div >
      </div>
    </div>
  )
}

export default Feed
