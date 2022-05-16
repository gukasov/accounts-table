import { capitalize } from 'lodash'
import { SelectItem } from 'primereact/selectitem'
import { AccountStatus } from '../../types'

export const STATUS_ORDER: AccountStatus[] = [
  AccountStatus.Pending,
  AccountStatus.Approved,
  AccountStatus.Funded,
  AccountStatus.Closed,
]

export const STATUS_OPTIONS: SelectItem[] = Object.values(AccountStatus).map(status => ({
  label: capitalize(status),
  value: status,
}))
