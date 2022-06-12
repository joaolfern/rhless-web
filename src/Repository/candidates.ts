import { AxiosResponse } from 'axios'
import api from 'config/api'
import { ICandidatesListRequest, ICandidatesListResponse, _candidateStatus } from 'types/Candidates'
import { Repository } from './'

class CandidateRepository {
  static async index (config: ICandidatesListRequest): Promise<ICandidatesListResponse> {
    return Repository.handle(() =>
      api.get('/auth/candidates', config)
    )
  }

  static async updateStatus ({ id, data }: { data: { status: _candidateStatus, job: string }, id: string }): Promise<AxiosResponse<string>> {
    return Repository.handle(() =>
      api.patch(`/auth/candidates/${id}/status`, data)
    )
  }

  static async massReprove ({ id, data }: { data: { hiredCandidate: string }, id: string }): Promise<AxiosResponse<string>> {
    return Repository.handle(() =>
      api.patch(`/auth/candidates/${id}/reprove`, data)
    )
  }

  static async create (data: { job: string, user: string }): Promise<ICandidatesListResponse> {
    return Repository.handle(() =>
      api.post('/auth/candidates', data)
    )
  }
}

export default CandidateRepository
