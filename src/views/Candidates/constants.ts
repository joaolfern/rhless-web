import { _tagTypes } from 'components/Tag/Tag'
import { _candidateStatus } from 'types/Candidates'

export const translateStatus: {[key in _candidateStatus]: string} = {
  hired: 'Contratado',
  pending: 'Pendente',
  reproved: 'Reprovado'
}

export const tagStatus: {[key in _candidateStatus]: _tagTypes} = {
  hired: 'secondary',
  reproved: 'red',
  pending: 'yellow'
}
