import express from 'express'
import { faker } from '@faker-js/faker'
import AccountsSchema from './accounts.schema'

const router = express.Router()

// Route to retrieve accounts
router.get('/', async (_req, res) => {
  const accounts = await Account.find()
  res.send(accounts)
})

// Generate some fake accounts
router.post('/generate-mock-accounts', (req, res) => {
  for (let i = 0; i < 5; i++) {
    const fakeAccount = new AccountsSchema({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      username: faker.internet.userName(),
      dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
      email: faker.internet.email(),
      phone: {
        country_code: '+1',
        number: faker.phone.number('913-###-####'),
      },
      login: {
        password: faker.internet.password(),
      },
    })

    fakeAccount.save((err, data) => {
      if (err) console.log(err)
    })
  }

  res.send('Mock accounts generated')
})

export default router
