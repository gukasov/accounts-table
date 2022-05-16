import { QueryProvider } from './providers'
import { AccountsPage } from './pages'

export function App() {
  return (
    <QueryProvider>
      <AccountsPage />
    </QueryProvider>
  )
}
