const router = require('express').Router()
const {Event, EventRestaurants} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    let description = ''
    if (req.body.description) {
      description = req.body.description
    }
    const newEvent = await Event.create({
      name: req.body.eventName,
      description: description,
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
    const restaurants = req.body.restaurants
    const importance = req.body.importance
    restaurants.forEach(async rId => {
      let foundExisting = await EventRestaurants.findOne({
        where: {
          eventId: eventId,
          restaurantId: rId
        }
      })
      if(foundExisting){
        await foundExisting.update({score: foundExisting.updateScore(importance)})
      } else {
        await EventRestaurants.create({
          eventId: eventId,
          restaurantId: rId,
          score: importance
        })
      }
    })
    res.status(201).send('Updated restaurants')
  } catch (err){
    next(err)
  }
})
