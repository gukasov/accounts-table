import { Account, AccountStatus } from '../../types'

type StatusChangeValidator = (account: Account) => boolean

const makeStatusValidator = (validStatuses: AccountStatus[]) => (account: Account) =>
  validStatuses.includes(account.status)

const statusTransitions: Record<AccountStatus, StatusChangeValidator[]> = {
  [AccountStatus.Pending]: [makeStatusValidator([])],

  [AccountStatus.Approved]: [makeStatusValidator([AccountStatus.Pending])],

  [AccountStatus.Funded]: [makeStatusValidator([AccountStatus.Approved])],

  [AccountStatus.Closed]: [
    makeStatusValidator([AccountStatus.Approved, AccountStatus.Pending]),
    account => account.status === AccountStatus.Funded && account.balance === 0,
  ],
}

export const isValidStatusOption = (account: Account, targetStatus: AccountStatus) => {
  if (account.status === targetStatus) {
    return false
  }

  return statusTransitions[targetStatus].some(validator => validator(account))
}
