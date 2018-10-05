const router = require('express').Router()
const {Event, Restaurant, EventRestaurant} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const newEvent = await Event.create({
      name: req.body.eventName,
      description: req.body.description,
      guests: req.body.guests,
      isPrivate: req.body.isPrivate,
      creatorId: req.user.id
    })
    res.json(newEvent).status(201)
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
