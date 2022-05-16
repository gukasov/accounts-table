const express = require('express')
const bodyParser = require('body-parser')
const { faker } = require('@faker-js/faker')

const app = express()

const PORT = 3001

app.use(bodyParser.json())
app.set('port', PORT)

const accountRecords = [
  {
    id: faker.datatype.uuid(),
    status: 'FUNDED',
    balance: 0,
  },

  ...Array.from({ length: 1000 }, () => {
    const status = faker.helpers.arrayElement(['PENDING', 'APPROVED', 'FUNDED', 'CLOSED'])

    return {
      status,
      id: faker.datatype.uuid(),
      balance: status === 'PENDING' ? 0.0 : faker.datatype.number({ precision: 0.01 }),
    }
  }),
]

app.get('/accounts', (req, res) => {
  res.json(accountRecords)
})

app.patch('/accounts/:accountId', (req, res) => {
  const accountId = req.param('accountId')
  const newStatus = req.body.status
  const accountIndex = accountRecords.findIndex(account => account.id === accountId)

  accountRecords[accountIndex].status = newStatus

  res.json(accountRecords[accountIndex])
})

app.listen(PORT, () => {
  console.log(`Running dev server at: http://localhost:${PORT}/`)
})
