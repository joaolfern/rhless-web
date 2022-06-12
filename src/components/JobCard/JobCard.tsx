import React, { useCallback, useState } from 'react'
import { IJob } from 'types/Jobs'
import dayjs from 'dayjs'
import useSwipeDistance from 'hooks/useSwipeDistance'
import toast from 'react-hot-toast'
import useUser from 'hooks/useUser'
import CandidateRepository from 'Repository/candidates'
import { useNavigate } from 'react-router-dom'
import paths from 'router/paths'
import Button from 'components/Button/Button'
import { isTouchDevice } from 'utils'
interface IJobCard {
  job: IJob & { hasCandidature?: true }
}

function JobCard ({ job }: IJobCard) {
  const { session } = useUser()
  const navigate = useNavigate()

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
      throw err
    }
  }

  const createToastfulCandidature = useCallback(() => {
    if (!session?.user._id) {
      navigate(paths.unauth.userLogin)
      toast('Você precisar entrar para se candidatar')
      return
    }

    toast.promise(createCandidature(), {
      loading: 'Candidatando-se...',
      success: 'Candidatura realizada com sucesso!',
      error: value => value
    })
  }, [session?.user._id])

  const { handlers, swipedDistance } = useSwipeDistance({
    direction: 'Right',
    onSwiped: eventData => {
      setTransitionTranslate(true)
      if (swipedDistance > 0.5) {
        if (!session?.user._id) {
          navigate(paths.unauth.userLogin)
          toast('Você precisar entrar para se candidatar')
          return
        }
        createToastfulCandidature()
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
      <div
        className={`flex flex-col justify-center ${transitionTranslate ? 'transition-transform duration-150' : ''}`}
        style={{
          transform: `translateX(${swipedDistance * 1.3 * 100}%)`
        }}
      >
        <p className='text-sm'>
          {job.city}
        </p>
        <div className='flex items-center justify-between'>
          <p className='font-semibold text-primary'>
            {job.name}
          </p>
          {!isTouchDevice() && (
            <div>
              <Button
                className={`transition-colors duration-75 px-[0.125rem] py-[0.125rem] w-32 ${job.hasCandidature ? ' bg-primary ' : 'text-primary border-primary border-[1px] '}`}
                style={{ ...(!job.hasCandidature ? { color: '#008405' } : {}) }}
                onClick={() => createToastfulCandidature()}
                onKeyDown={e => e.key === 'Enter' && createToastfulCandidature()}
              >
                <span className='flex items-center justify-center gap-[6px] whitespace-nowrap'>
                  <span className='text-sm'>{job.hasCandidature ? 'Candidatado' : 'Candidatar-se'}</span>
                </span>
              </Button>
            </div>
          )}
        </div>
        <p className='font-semibold'>
          {job.author.name}
        </p>
        <p>
          {job.department}
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
