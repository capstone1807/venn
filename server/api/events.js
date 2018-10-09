const router = require('express').Router()
const {User, Event, EventUser, Restaurant, EventRestaurant} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  // OB/JL: looks like a good opportunity for model methods
  // OB/JL: also, this could maybe become one `.create` that looks like:
  // await Event.create({
  //   name: req.body.eventName,
  //   description: req.body.description,
  //   isPrivate: req.body.isPrivate,
  //   creatorId: req.user.id,
  //   event_users: [{
  //     userId: 5,
  //     isAdmin: false
  //   }, /* ... */]
  // }, {
  //   include: [{model: EventUser, as: 'event_users'}]
  // });
  // as long as we specify a direct association between Event and EventUser
  // e.g. Event.hasMany(EventUser, {as: 'event_users'}) (over in db/models/index.js)
  try {
    const newEvent = await Event.create({
      name: req.body.eventName,
      description: req.body.description,
      isPrivate: req.body.isPrivate,
      creatorId: req.user.id
    });
    req.body.guests.forEach(async guest => {
      const guestObject = await User.findOne({
        where: {
          username: guest
        }
      })
      await newEvent.addUser(guestObject)
    })
    const creator = await User.findById(req.user.id)
    await newEvent.addUser(creator)
    await EventUser.update({
      isAdmin: true
    },{
      where: {
        eventId: newEvent.id,
        userId: req.user.id
      }
    })
    let updatedEvent = await creator.getEvents({
      where: {
        id: newEvent.id
      }
    })
    updatedEvent = updatedEvent[0]
    res.json(updatedEvent).status(201)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try{
    const foundEvent = await Event.findById(req.params.id)
    res.json(foundEvent)
  } catch(err){
    next(err)
  }
})

// OB/JL: could make sense to have an `/api/event_users` route or maybe `/api/attendance` route
// OB/JL: this route is specific for a particular user action, could be more generic to any query / data the frontend might send
router.put('/:id/pending', async (req, res, next) => {
  try {
    // OB/JL: could use destructuring binding here
    let updatedEvent = await EventUser.update({
      hasResponded: true
    }, {
      where:{
        userId: req.user.id,
        eventId: req.params.id
      },
      returning: true
    })
    updatedEvent = updatedEvent[1][0]
    res.status(201).json(updatedEvent)
  } catch (err) {
    next(err)
  }
})

// OB/JL: this route could be `POST /api/events?isFinal=true` or maybe `POST /api/events/final` or `POST /api/final-events`, also `PUT /api/events/:someId and in the body {isFinal: true}`
router.put('/:id/scheduled', async (req, res, next) => {
  // OB/JL: this logic could be its own method somewhere
  try {
    let updatedEvent = await Event.update({
      isPending: false
    }, {
      where:{
        id: req.params.id
      },
      returning: true
    })
    // FINAL RESTAURANT IS UPDATED WHEN AN EVENT MOVES TO 'SCHEDULED'
    const restaurantScore = await EventRestaurant.findAll({
      attributes: ['score', 'restaurantId'],
      where: {
        eventId: req.params.id
      }
    })
    const finalId = EventRestaurant.getFinal(restaurantScore)
    await EventRestaurant.update({
      isFinal: true
    }, {
      where: {
        restaurantId: finalId,
        eventId: req.params.id
      }
    })
    updatedEvent = updatedEvent[1][0]
    res.status(201).json(updatedEvent)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/restaurants', (req, res, next) => {
  try {
    const eventId = req.params.id
    const restaurants = req.body.restaurantKeys
    const importance = req.body.importance
    // OB/JL: async functions and `forEach` are not friends, async issue below (race conditions and lack of error handling), instead use `.map` to construct an array of promises then `Promise.all` to convert an array of promises into ONE promise for an array of those resolved values, then `await` that aggregate promise, or you could use something like Bluebird and do `Bluebird.map`
    restaurants.forEach(async key => {
      let restaurant = await Restaurant.findOne({
        where: {
          placeId: key
        }
      })
      let foundExisting = await EventRestaurant.findOne({
        where: {
          eventId,
          restaurantId: restaurant.id,
        }
      })
      if(foundExisting){
        await foundExisting.update({score: foundExisting.updateScore(importance)})
      } else {
        await EventRestaurant.create({
          eventId,
          restaurantId: restaurant.id,
          score: importance
        })
      }
    })
    res.status(201).send('Updated restaurants')
  } catch (err){
    next(err)
  }
})

router.get('/:id/final-restaurant', async (req, res, next) => {
  try{
    const finalEventRestaurant = await EventRestaurant.findOne({
      where: {
        eventId: req.params.id,
        isFinal: true
      }
    })
    const finalRestaurant = await Restaurant.findById(finalEventRestaurant.restaurantId)
    res.json(finalRestaurant)
  } catch(err){
    next(err)
  }
})

router.get('/:id/guests', async (req, res, next) => {
  try{
    const foundEvent = await Event.findById(req.params.id)
    const guests = await foundEvent.getUsers()
    res.json(guests)
  } catch(err){
    next(err)
  }
})
