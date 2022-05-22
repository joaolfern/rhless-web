import { IRequest, IRequestPaginated, IRequestSearchable, IResponsePaginated } from 'Repository/type'
import { IJob } from 'types/Jobs'
import { IUser } from 'types/Users'

export type _candidateStatus = 'hired' | 'pending' | 'reproved'

export type ICandidate = {
  _id: string
  job: IJob
  user: IUser
  author: IUser
  status: _candidateStatus
  resume: string
}

export type ICandidatesListRequestParams = IRequestPaginated & IRequestSearchable

export type ICandidatesListRequest = IRequest<ICandidatesListRequestParams>

export type ICandidatesListResponse = IResponsePaginated<ICandidate>
