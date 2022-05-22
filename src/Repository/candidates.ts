import axios from 'axios'
import { ICandidatesListRequest, ICandidatesListResponse } from 'types/Candidates'
import { Repository } from './'

class CandidateRepository {
  static async index (config: ICandidatesListRequest): Promise<ICandidatesListResponse> {
    return Repository.handle(() =>
      axios.get('/auth/candidates', config)
    )
  }
}

export default CandidateRepository
