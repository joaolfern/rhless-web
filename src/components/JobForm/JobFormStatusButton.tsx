import React from 'react'
import ButtonGhost from 'components/ButtonGhost/ButtonGhost'
import { _jobStatus } from 'types/Jobs'
import { formActionStatus } from 'views/Jobs/constants'

type IJobFormStatusButtonProps = {
  updateStatus: (status: _jobStatus) => void
  status: _jobStatus
}

function JobFormStatusButton ({ updateStatus, status }: IJobFormStatusButtonProps) {
  return (
    <ButtonGhost
      className='px-3 py-1'
      type='button'
      onClick={() => updateStatus(formActionStatus[status].action)}
      onKeyDown={e => e.key === 'Enter' && updateStatus(formActionStatus[status].action)}
    >
      {formActionStatus[status].label}
    </ButtonGhost>
  )
}

export default JobFormStatusButton
