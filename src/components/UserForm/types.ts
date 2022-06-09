import { _userStatus, _userType } from 'types/Users'

export interface IUserForm {
  user: IUserFormUser
}

export interface IUserFormUser {
  _id?: string
  name: string
  picture: string
  email: string
  password: string
  confirmPassword: string
  type: _userType
  status: _userStatus
}
