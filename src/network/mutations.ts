import { useMutation, useQueryClient } from 'react-query'
import { api } from './api'
import { QueryKey } from './const'

export const useUpdateAccountStatusMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(api.updateAccountStatus, {
    onSuccess: async() => {
      await queryClient.invalidateQueries(QueryKey.GetAccounts)
    },
  })
}
