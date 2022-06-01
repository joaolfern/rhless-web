import api from 'config/api'
import { ICandidatesListRequest, ICandidatesListResponse } from 'types/Candidates'
import { Repository } from './'

class CandidateRepository {
  static async index (config: ICandidatesListRequest): Promise<ICandidatesListResponse> {
    return Repository.handle(() =>
      api.get('/auth/candidates', config)
    )
  }
}

export default CandidateRepository
