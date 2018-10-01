'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const mockData = require('./MOCK_DATA.json')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Code',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Murph',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const usersData = []
  for (let i = 0; i < 20; i++) {
    usersData.push(User.create(mockData[i]))
  }
  await Promise.all(usersData)
  //this line gets us all our users to associate them.
  const userAssociation = await User.findAll()
  //we loop through all the created users and associate them with the next user in the database
  for (let i = 0; i < userAssociation.length - 1; i++) {
    await userAssociation[i].addFriend(userAssociation[i + 1])
  }
  console.log(`seeded ${users.length + usersData.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
