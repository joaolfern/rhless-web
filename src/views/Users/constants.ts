import { _userStatus, _userType } from 'types/Users'

export const translateStatus: {[key in _userStatus]: string} = {
  active: 'Ativo',
  inactive: 'Desativado'
}

export const translateType: {[key in _userType]: string} = {
  headhunter: 'Recrutador',
  candidate: 'Candidato'
}
