import { _candidateStatus } from 'types/Candidates'

export const translateStatus: {[key in _candidateStatus]: string} = {
  hired: 'Contratado',
  pending: 'Pendente',
  reproved: 'Reprovado'
}
