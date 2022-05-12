import axios from 'axios'
import { IUsersListRequest, IUsersListResponse } from 'types/Users'
import { Repository } from './'

class UserRepository {
  static async index (config: IUsersListRequest): Promise<IUsersListResponse> {
    return Repository.handle(() =>
      axios.get('/auth/users', config)
    )
  }
}

export default UserRepository
