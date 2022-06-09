import { _tagTypes } from 'components/Tag/Tag'
import { _userStatus, _userType } from 'types/Users'

export const translateStatus: {[key in _userStatus]: string} = {
  active: 'Ativo',
  inactive: 'Bloqueado',
  pending: 'Pendente'
}
export const tagStatus: {[key in _userStatus]: _tagTypes} = {
  active: 'secondary',
  inactive: 'red',
  pending: 'yellow'
}

export const translateType: {[key in _userType]: string} = {
  headhunter: 'Recrutador',
  candidate: 'Candidato',
  admin: 'Administrador'
}
