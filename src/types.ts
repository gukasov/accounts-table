export type UUID = string

export enum AccountStatus {
  Approved = 'APPROVED',
  Closed = 'CLOSED',
  Funded = 'FUNDED',
  Pending = 'PENDING',
}

export type Account = {
  id: UUID
  balance: number
  status: AccountStatus
}
