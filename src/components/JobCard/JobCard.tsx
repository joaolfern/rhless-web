import React, { useState } from 'react'
import { IJob } from 'types/Jobs'
import dayjs from 'dayjs'
import useSwipeDistance from 'hooks/useSwipeDistance'
import toast, { Toaster } from 'react-hot-toast'
import useUser from 'hooks/useUser'
import CandidateRepository from 'Repository/candidates'

interface IJobCard {
  job: IJob
}

const notify = () => toast('Here is your toast.')

function JobCard ({ job }: IJobCard) {
  const { session } = useUser()

  const [transitionTranslate, setTransitionTranslate] = useState(false)

  async function createCandidature () {
    if (!session?.user._id || !job._id) return

    const data = {
      user: session?.user._id,
      job: job._id
    }

    try {
      await CandidateRepository.create(data)
    } catch (err) {
      console.error(err)
    }
  }

  const { handlers, swipedDistance } = useSwipeDistance({
    direction: 'Right',
    onSwiped: eventData => {
      setTransitionTranslate(true)
      if (swipedDistance > 0.5) {
        toast.promise(createCandidature(), {
          loading: 'Candidatando-se...',
          success: 'Candidatura realizada com sucesso!',
          error: 'Erro'
        })
      }
    },
    onSwiping: eventData => {
      if (transitionTranslate) setTransitionTranslate(false)
    }
  })

  return (
    <div
      className='border-t-[1px] border-gray-200 p-3  relative w-full overflow-hidden'
      {...handlers}
    >
      <Toaster />
      <div
        className={`flex flex-col ${transitionTranslate ? 'transition-transform duration-150' : ''}`}
        style={{
          transform: `translateX(${swipedDistance * 1.3 * 100}%)`
        }}
        onClick={() => {
          console.log('sim')
          notify()
        }}
      >
        <p className='font-semibold text-primary'>
          {job.name}
        </p>
        <p className='font-semibold'>
          {job.author.name}
        </p>
        <p>
          {job.department}
        </p>
        <p className='text-sm'>
          {job.city}
        </p>
        <p className='ml-auto text-sm text-light-text'>
          {dayjs(job.createdAt).fromNow()}
        </p>
      </div>
      <span
        className={`bg-primary absolute inset-0 -z-[1] flex justify-center items-center text-white font-bold ${transitionTranslate ? 'transition-opacity duration-150' : ''}`}
        style={{
          opacity: swipedDistance * 1.25
        }}
      >
        Candidatar-se
      </span>
    </div>
  )
}

export default JobCard
