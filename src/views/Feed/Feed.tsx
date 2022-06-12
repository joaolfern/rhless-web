import JobCard from 'components/JobCard/JobCard'
import React, { useEffect, useRef, useState } from 'react'
import JobRepository from 'Repository/jobs'
import { IJob, IJobsListRequest, IJobsListRequestParams } from 'types/Jobs'
import logo from 'assets/logo.jpg'
import swipe from 'assets/swipe.png'
import AccountFeedLabel from 'components/AccountFeedLabel/AccountFeedLabel'
import { useForm } from 'react-hook-form'
import { IRequestSearchable, IResponsePaginatedState } from 'Repository/type'
import InputSm from 'components/Input/InputSm'
import InfiniteScroll from 'react-infinite-scroll-component'
import useDialogContext from 'hooks/useDialogContext'
import browserStorage from 'store'
import { isTouchDevice } from 'utils'

const limit = 10

function Feed () {
  const { dialog } = useDialogContext()

  const [loadingJobs, setLoadingJobs] = useState(false)
  const [response, setResponse] = useState<IResponsePaginatedState<IJob> | null>(null)
  const [docs, setDocs] = useState<IJob[]>([])
  const cachedParams = useRef<IJobsListRequestParams>({ page: 1, limit })

  const { handleSubmit: handleSearch, register } = useForm<IRequestSearchable>()
  const { ref: searchRef, ...searchRegister } = register('search')

  const [showSwipeTip, setShowSwipeTip] = useState(false)

  useEffect(() => {
    function showSwipeTip () {
      if (!browserStorage.get('swipe_tip')) {
        setShowSwipeTip(true)
        console.log('🎈🎈🎈🎈🎈', browserStorage.get('swipe_tip'))
      }
    }

    let timer: any

    if (!browserStorage.get('swipe_tip') && isTouchDevice()) timer = setTimeout(showSwipeTip, 3000)

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [])

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
        className='w-[200px] md:w-[300px]'
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
      <div
        onClick={() => setShowSwipeTip(false)}
        onKeyDown={() => setShowSwipeTip(false)}
        className={`fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-200 text-white ${showSwipeTip ? '' : 'pointer-events-none'}  ${showSwipeTip ? 'opacity-1' : 'opacity-0'}`}
      >
        <div className='flex flex-col items-center justify-center gap-6 mt-10'>
          <img
            src={swipe}
            placeholder='Arraste para direita'
            className='z-10 w-6'
          />
          <p className='z-10 font-semibold'>Arraste para direita para se candidatar</p>
        </div>
        <div className='absolute inset-0 w-full h-full bg-black opacity-50' />
      </div>
    </div>
  )
}

export default Feed
