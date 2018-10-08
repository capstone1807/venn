const router = require('express').Router()
const {User, Event, EventUser, Restaurant, EventRestaurant} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
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
        eventId: newEvent.id
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

router.put('/:id/pending', async (req, res, next) => {
  try {
    const updatedEvent = await EventUser.update({
      hasResponded: true
    }, {
      where:{
        userId: req.user.id,
        eventId: req.params.id
      },
      returning: true
    })
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
