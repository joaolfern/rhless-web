import { AxiosResponse } from 'axios'
import { IJobFormJob } from 'components/JobForm/JobForm'
import api from 'config/api'
import { IJobsListRequest, IJobsListResponse, _jobStatus } from 'types/Jobs'
import { Repository } from './'

class JobRepository {
  static async index (config: IJobsListRequest): Promise<IJobsListResponse> {
    return Repository.handle(() =>
      api.get('/auth/jobs', config)
    )
  }

  static async feed (config: IJobsListRequest): Promise<IJobsListResponse> {
    return Repository.handle(() =>
      api.get('/unauth/feed', config)
    )
  }

  static async create (data: IJobFormJob): Promise<AxiosResponse<string>> {
    return Repository.handle(() =>
      api.post('/auth/jobs', data)
    )
  }

  static async update ({ id, data }: { data: IJobFormJob, id: string }): Promise<AxiosResponse<string>> {
    return Repository.handle(() =>
      api.patch(`/auth/jobs/${id}`, data)
    )
  }

  static async updateStatus ({ id, data }: { data: { status: _jobStatus }, id: string }): Promise<AxiosResponse<string>> {
    return Repository.handle(() =>
      api.patch(`/auth/jobs/${id}/status`, data)
    )
  }

  static async block ({ id }: { id: string }): Promise<AxiosResponse<string>> {
    return Repository.handle(() =>
      api.delete(`/auth/jobs/${id}`)
    )
  }
}

export default JobRepository
