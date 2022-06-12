import { _userStatus, _userType } from 'types/Users'

export type ICreateAccountForm = {
  name: string
  picture: string
  email: string
  password: string
  confirmPassword: string
  resume: string
  type: _userType
  status: _userStatus
}
