import { IRequest, IRequestPaginated, IRequestSearchable, IResponsePaginated } from 'Repository/type'
import { IJob } from 'types/Jobs'
import { IUser } from 'types/Users'

export type _candidateStatus = 'hired' | 'pending' | 'reproved'

export type ICandidate = {
  _id: string
  job: IJob
  user: IUser
  resume: string
  status: _candidateStatus
}

export type ICandidatesListRequestParams = IRequestPaginated & IRequestSearchable

export type ICandidatesListRequest = IRequest<ICandidatesListRequestParams>

export type ICandidatesListResponse = IResponsePaginated<ICandidate>
