import { IRequest, IRequestPaginated, IRequestSearchable, IResponse, IResponsePaginated } from 'Repository/type'

export type _userStatus = 'active' | 'inactive' | 'pending'
export type _userType = 'admin' | 'headhunter' | 'candidate'

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

export type ILoginResponse = IResponse<{
  token: string
  user: IUser
}>
