import JobCard from 'components/JobCard/JobCard'
import React, { useEffect, useRef, useState } from 'react'
import JobRepository from 'Repository/jobs'
import { IJob, IJobsListRequest, IJobsListRequestParams, IJobsListResponse } from 'types/Jobs'
import logo from 'assets/logo.jpg'
import { useSwipeable } from 'react-swipeable'

type IStateReponse = Omit<IJobsListResponse, 'data.docs'> | null

const limit = 10

function Feed () {
  const [response, setResponse] = useState<IStateReponse>(null)
  const [docs, setDocs] = useState<IJob[]>([])

  const [loadingDocs, setLoadingDocs] = useState(false)
  const cachedParams = useRef<IJobsListRequestParams>({ page: 1, limit })

  async function getDocs (params: IJobsListRequestParams) {
    setLoadingDocs(true)

    const requestConfig: IJobsListRequest = {
      params
    }

    try {
      const reponse = await JobRepository.feed(requestConfig)
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

  return (
    <div>
      <img
        src={logo}
      />

      <div>
        {docs.map(job => (
          <JobCard
            key={job._id}
            job={job}
          />
        ))}
      </div>
    </div>
  )
}

export default Feed
