'use strict'
const db = require('../server/db')
const {User, Restaurant} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Tess',
      lastName: 'Wolterstorff',
      username: 'tesspresso',
      email: 'tesswolterstorff@gmail.com',
      password: '123'
    }),
    User.create({
      firstName: 'Laura',
      lastName: 'Robinson',
      username: 'helloimlaura',
      email: 'laurarachel@gmail.com',
      password: '123'
    }),
    User.create({
      firstName: 'Gittie',
      lastName: 'Atlas',
      username: 'gittieatlas',
      email: 'gittieatlas@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'James',
      lastName: 'Byrd',
      username: 'jamesbyrd1265',
      email: 'james.byrd1265@gmail.com',
      password: '123'
    }),
    User.create({
      firstName: 'Dan',
      lastName: 'Gilbert',
      username: 'danglebert',
      email: 'daniel.gilbert0051@gmail.com',
      password: '123'
    }),
    User.create({
      firstName: 'Adil',
      lastName: 'Minocherhomjee',
      username: 'aminoche',
      email: 'adilminocherhomjee@gmail.com',
      password: '123'
    }),
    User.create({
      firstName: 'John',
      lastName: 'Riccardi',
      username: 'riccjohn',
      email: 'riccjohn@gmail.com',
      password: '123'
    }),
    User.create({
      firstName: 'Morgan',
      lastName: 'Brown',
      username: 'morganb816',
      email: 'morganb816@gmail.com',
      password: '123'
    }),
    User.create({
      firstName: 'Javier',
      lastName: 'Carey',
      username: 'jav1jav',
      email: 'javiercarey@gmail.com',
      password: '123'
    }),
    User.create({
      firstName: 'Omri',
      lastName: 'Bernstein',
      username: 'omribernstein',
      email: 'hippiccolo@gmail.com',
      password: '123'
    }),
    User.create({
      firstName: 'Jessie',
      lastName: 'De La Cruz Santos',
      username: 'jessdelacruzsantos',
      email: 'jessdelacruzsantos@gmail.com',
      password: '123'
    }),
    User.create({
      firstName: 'Jack',
      lastName: 'Lye',
      username: 'catncradle',
      email: 'catncradle@gmail.com',
      password: '123'
    })
  ])

  console.log(`seeded ${users.length} users`)
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
