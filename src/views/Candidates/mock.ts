import { ICandidate } from 'types/Candidates'
import jobsMock from 'views/Jobs/mock'
import usersMock from 'views/Users/mock'

const candidatesMock: ICandidate[] = [
  {
    _id: '111',
    job: jobsMock[0],
    user: usersMock[0],
    author: usersMock[0],
    resume: 'aaaa',
    status: 'hired'
  }
]

export default candidatesMock
