import { _jobStatus, _jobTypes } from 'types/Jobs'

export const translateStatus: {[key in _jobStatus]: string} = {
  active: 'Ativo',
  inactive: 'Desativado'
}
export const translateType: {[key in _jobTypes]: string} = {
  fullTime: 'Integral',
  intern: 'Estágio'
}
