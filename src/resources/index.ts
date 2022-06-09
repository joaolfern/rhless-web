import { ISelect, ITypedSelect } from 'components/Select/Select'
import { _userType } from 'types/Users'

const USER_TYPE_RESOURECE: ITypedSelect<_userType, string>[] = [
  {
    label: 'Administrador',
    value: 'admin'
  },
  {
    label: 'Recrutador',
    value: 'headhunter'
  },
]

export {
  USER_TYPE_RESOURECE
}
