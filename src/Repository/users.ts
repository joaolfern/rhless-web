import { IRequestAccountForm } from 'components/RequestAccountModal/type'
import api from 'config/api'
import { IResponse } from 'Repository/type'
import { ILoginResponse, IUsersListRequest, IUsersListResponse } from 'types/Users'
import { ILoginForm } from 'views/Login/type'
import { Repository } from './'

class UserRepository {
  static async index (config: IUsersListRequest): Promise<IUsersListResponse> {
    return Repository.handle(() =>
      api.get('/auth/users', config)
    )
  }

  static async requestAccount (data: IRequestAccountForm): Promise<IUsersListResponse> {
    return Repository.handle(() =>
      api.post('/unauth/request-account', data)
    )
  }

  static async login (data: ILoginForm): Promise<ILoginResponse> {
    return Repository.handle(() =>
      api.post('/unauth/login', data)
    )
  }
}

export default UserRepository
