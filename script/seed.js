'use strict'

const db = require('../server/db')
const {User, Restaurant} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Code',
      username: 'codydog2018',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Murph',
      username: 'themurph2018',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Smurfy',
      lastName: 'Smurf',
      username: 'bigd4wg',
      email: 'smurfy@email.com',
      password: '123'
    })
  ])

  const restaurants = await Promise.all([
    Restaurant.create({
      title: 'Ottimo Cafe',
      description: 'U.S. 9, Howell, NJ, USA',
      placeId: 'ChIJ8VK-FVV_wYkR4A3G7hRBkjU'
    }),

    Restaurant.create({
      title: 'Dairy Queen',
      description: 'Trenton Lakewood Road, Clarksburg, NJ, USA',
      placeId: 'ChIJv-c_qCNjwYkRK--WCcRJ6y0'
    })
  ])

  const cody = await User.findById(1)
  const murphy = await User.findById(2)
  const smurfy = await User.findById(3)
  await cody.addFriends(murphy)
  await cody.addFriends(smurfy)

  const ottimo = await Restaurant.findById(1)
  const dairyQueen = await Restaurant.findById(2)
  await cody.addRestaurant(ottimo)
  await cody.addRestaurant(dairyQueen)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${restaurants.length} users`)
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
