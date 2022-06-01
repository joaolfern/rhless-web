import api from 'config/api'
import { IJobsListRequest, IJobsListResponse } from 'types/Jobs'
import { Repository } from './'

class JobRepository {
  static async index (config: IJobsListRequest): Promise<IJobsListResponse> {
    return Repository.handle(() =>
      api.get('/auth/jobs', config)
    )
  }
}

export default JobRepository
