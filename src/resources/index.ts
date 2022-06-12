import { ITypedSelect } from 'components/Select/Select'
import { _userType } from 'types/Users'
import { _jobTypes } from 'types/Jobs'

export const USER_TYPE_RESOURECE: ITypedSelect<_userType, string>[] = [
  {
    label: 'Administrador',
    value: 'admin'
  },
  {
    label: 'Recrutador',
    value: 'headhunter'
  },
  {
    label: 'Candidato',
    value: 'candidate'
  }
]

export const JOB_TYPE_RESOURCE: ITypedSelect<_jobTypes, string>[] = [
  {
    label: 'Estágio',
    value: 'intern'
  },
  {
    label: 'Integral',
    value: 'fullTime'
  }
]
