import { useQuery } from 'react-query'
import { QueryKey } from './const'
import { api } from './api'

export const useGetAccountsQuery = () => useQuery(QueryKey.GetAccounts, () => api.getAccounts(), {
  select: ({ data }) => data
})
