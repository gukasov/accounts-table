import { VFC, useMemo } from 'react'
import { capitalize } from 'lodash'
import { Dropdown } from 'primereact/Dropdown'
import { SelectItem } from 'primereact/selectitem'

import { Account, AccountStatus } from '../../types'
import { useUpdateAccountStatusMutation } from '../../network'
import { isValidStatusOption } from './isValidStatusOption'

type StatusCellProps = {
  account: Account
}

export const StatusCell: VFC<StatusCellProps> = ({ account }) => {
  const { mutateAsync: updateAccountStatus, isLoading } = useUpdateAccountStatusMutation()

  const handleStatusChange = (newStatus: AccountStatus) => {
    updateAccountStatus({ accountId: account.id, status: newStatus })
  }

  const statusOptions: SelectItem[] = useMemo(
    () =>
      Object.values(AccountStatus)
        .filter(status => isValidStatusOption(account, status))
        .map(status => ({
          label: capitalize(status),
          value: status,
        })),
    [account],
  )

  return (
    <Dropdown
      placeholder={capitalize(account.status)}
      value={account.status}
      disabled={isLoading || statusOptions.length === 0}
      options={statusOptions}
      onChange={e => handleStatusChange(e.value)}
      style={{ width: '12rem' }}
    />
  )
}
