import { FC, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export const QueryProvider: FC = ({ children }) => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 10000,
          },
        },
      }),
    [],
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
