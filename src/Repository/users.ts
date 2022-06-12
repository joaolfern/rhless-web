import { AxiosResponse } from 'axios'
import { ICreateAccountForm } from 'components/CreateAccountForm/type'
import { IRequestAccountForm } from 'components/RequestAccountModal/type'
import { IUserFormUser } from 'components/UserForm/types'
import api from 'config/api'
import { ILoginResponse, IUsersListRequest, IUsersListResponse, _userStatus } from 'types/Users'
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

  static async create (data: IUserFormUser): Promise<AxiosResponse<string>> {
    return Repository.handle(() =>
      api.post('/auth/users', data)
    )
  }

  static async register (data: ICreateAccountForm): Promise<AxiosResponse<string>> {
    return Repository.handle(() =>
      api.post('/unauth/register', data)
    )
  }

  static async update ({ id, data }: { data: IUserFormUser, id: string }): Promise<AxiosResponse<string>> {
    return Repository.handle(() =>
      api.patch(`/auth/users/${id}`, data)
    )
  }

  static async updateStatus ({ id, data }: { data: { status: _userStatus }, id: string }): Promise<AxiosResponse<string>> {
    return Repository.handle(() =>
      api.patch(`/auth/users/${id}`, data)
    )
  }

  static async block ({ id }: { id: string }): Promise<AxiosResponse<string>> {
    return Repository.handle(() =>
      api.delete(`/auth/users/${id}`)
    )
  }
}

export default UserRepository
