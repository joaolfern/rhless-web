import { _userStatus } from 'types/Users'

export const translateStatus: {[key in _userStatus]: string} = {
  active: 'Ativo',
  inactive: 'Desativado'
}
