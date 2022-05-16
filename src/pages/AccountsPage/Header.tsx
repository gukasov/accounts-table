import { useMemo, VFC } from 'react'
import { capitalize } from 'lodash'
import { Account, AccountStatus } from '../../types'
import { STATUS_ORDER } from './const'
import { TableHeader, Status } from './styled'

type HeaderProps = {
  accounts: Account[]
}

type TotalValuesByStatus = Record<
  AccountStatus,
  {
    balance: number
    count: number
  }
>

export const Header: VFC<HeaderProps> = ({ accounts }) => {
  const headerRecords = useMemo(() => {
    const totalByStatus: TotalValuesByStatus = accounts.reduce(
      (accumulator, account) => ({
        ...accumulator,
        [account.status]: {
          balance: (accumulator[account.status]?.balance ?? 0) + account.balance,
          count: (accumulator[account.status]?.count ?? 0) + 1,
        },
      }),
      {} as TotalValuesByStatus,
    )

    return Object.entries(totalByStatus)
      .map(([status, totals]) => ({ status, ...totals }))
      .sort(({ status: statusA }, { status: statusB }) => {
        const indexOfA = STATUS_ORDER.indexOf(statusA as AccountStatus)
        const indexOfB = STATUS_ORDER.indexOf(statusB as AccountStatus)

        return indexOfA - indexOfB
      })
  }, [accounts])

  return (
    <TableHeader>
      {headerRecords.map(({ status, count, balance }) => (
        <Status key={status}>
          <div>{capitalize(status)}</div>
          <div>Amount: {count}</div>
          <div>Balance: {balance.toFixed(2)}</div>
        </Status>
      ))}
    </TableHeader>
  )
}
