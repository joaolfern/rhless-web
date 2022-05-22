import { IRequest, IRequestPaginated, IRequestSearchable, IResponsePaginated } from 'Repository/type'

export type _userStatus = 'active' | 'inactive'

export type _userType = 'headhunter' | 'candidate'

export type IUser = {
  _id: string
  name: string
  email: string
  status: _userStatus
  picture: string
  type: _userType
}

export type IUsersListRequestParams = IRequestPaginated & IRequestSearchable

export type IUsersListRequest = IRequest<IUsersListRequestParams>

export type IUsersListResponse = IResponsePaginated<IUser>
