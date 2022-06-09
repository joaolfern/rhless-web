import { _tagTypes } from 'components/Tag/Tag'
import { _jobStatus, _jobTypes } from 'types/Jobs'

export const translateStatus: {[key in _jobStatus]: string} = {
  active: 'Ativo',
  inactive: 'Desativado'
}

export const formActionStatus: {[key in _jobStatus]: { label: string, action: _jobStatus }} = {
  active: {
    label: 'Desativar',
    action: 'inactive'
  },
  inactive: {
    label: 'Ativar',
    action: 'active'
  }
}

export const translateType: {[key in _jobTypes]: string} = {
  fullTime: 'Integral',
  intern: 'Estágio'
}

export const tagStatus: {[key in _jobStatus]: _tagTypes} = {
  active: 'secondary',
  inactive: 'ghost'
}
