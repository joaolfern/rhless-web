import axios from 'axios'
import { IJobsListRequest, IJobsListResponse } from 'types/Jobs'
import { Repository } from './'

class JobRepository {
  static async index (config: IJobsListRequest): Promise<IJobsListResponse> {
    return Repository.handle(() =>
      axios.get('/auth/jobs', config)
    )
  }
}

export default JobRepository
