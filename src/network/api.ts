import axios from 'axios'
import { Account, AccountStatus, UUID } from '../types'

export const api = {
  getAccounts: () => axios.get<Account[]>('/api/accounts'),

  updateAccountStatus: ({
    accountId,
    status,
  }: {
    accountId: UUID
    status: AccountStatus
  }) => axios.patch<Account>(`/api/accounts/${accountId}`, { status }),
}
