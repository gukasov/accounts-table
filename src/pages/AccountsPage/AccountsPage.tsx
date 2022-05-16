import { VFC } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column, ColumnProps } from 'primereact/column'
import { MultiSelect } from 'primereact/MultiSelect'
import { FilterMatchMode } from 'primereact/api'

import { useGetAccountsQuery } from '../../network'
import { Account } from '../../types'
import { Page } from './styled'
import { STATUS_OPTIONS } from './const'
import { StatusCell } from './StatusCell'
import { Header } from './Header'

const FILTERS = {
  status: { value: null, matchMode: FilterMatchMode.IN },
}

const statusFilterTemplate = options => {
  return (
    <MultiSelect
      value={options.value}
      options={STATUS_OPTIONS}
      onChange={e => options.filterCallback(e.value)}
      placeholder="Any"
      maxSelectedLabels={2}
      scrollHeight="280px"
    />
  )
}

const columns: ColumnProps[] = [
  {
    columnKey: 'balance',
    field: 'balance',
    header: 'Balance',
    sortable: true,
  },

  {
    columnKey: 'status',
    field: 'status',
    header: 'Status',
    body: (account: Account) => <StatusCell account={account} />,
    sortable: true,
    filter: true,
    filterField: 'status',
    filterElement: statusFilterTemplate,
    showFilterMatchModes: false,
  },
]

export const AccountsPage: VFC = () => {
  const { data: accounts = [] } = useGetAccountsQuery()

  return (
    <Page>
      <DataTable
        filters={FILTERS}
        value={accounts}
        scrollable
        removableSort
        scrollHeight="calc(100vh - 93px)"
        virtualScrollerOptions={{ itemSize: 73 }}
        header={() => <Header accounts={accounts} />}
      >
        {columns.map(column => (
          <Column {...column} key={column.columnKey} />
        ))}
      </DataTable>
    </Page>
  )
}
