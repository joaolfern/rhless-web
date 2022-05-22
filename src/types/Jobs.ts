import { IRequest, IRequestPaginated, IRequestSearchable, IResponsePaginated } from 'Repository/type'
import { IUser } from 'types/Users'

export type _jobStatus = 'active' | 'inactive'
export type _jobTypes = 'intern' | 'fullTime'

export type IJob = {
  _id: string
  name: string
  type: _jobTypes
  city: string
  department: string
  description: string
  status: _jobStatus
  author: IUser
}

export type IJobsListRequestParams = IRequestPaginated & IRequestSearchable

export type IJobsListRequest = IRequest<IJobsListRequestParams>

export type IJobsListResponse = IResponsePaginated<IJob>
