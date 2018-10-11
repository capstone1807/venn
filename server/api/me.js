const router = require('express').Router()
const {User, EventRestaurant, Restaurant, EventUser} = require('../db/models')
const Sequelize = require('sequelize')
const getPlaceDetailsById = require('./googleplaces')
const Op = Sequelize.Op

module.exports = router

router.get('/events', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const events = await user.getEvents()
    let verboseEvents = events.map(async event => {
      let jsonEvent = event.dataValues
      jsonEvent.creator = await event.getCreator()
      jsonEvent.finalRestaurant = await event.getFinalRestaurant()
      return event
    })
    verboseEvents = await Promise.all(verboseEvents)
    res.json(verboseEvents)
  } catch (err) {
    next(err)
  }
})

router.get('/notfriends', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'username'],
      where: {
        id: {
          [Op.not]: req.user.id
        }
      }
    })
    const user = await User.findById(req.user.id)
    await user.getFriends()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/friends', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const friends = await user.getFriends()
    res.json(friends)
  } catch (err) {
    next(err)
  }
})

router.put('/friends', async (req, res, next) => {
  if (Number(req.body.friendId) !== req.user.id) {
    try {
      const user = await User.findById(req.user.id)
      const newFriend = await User.findById(req.body.friendId)
      await user.addFriends(newFriend)
      res.status(201).send(newFriend)
    } catch (err) {
      next(err)
    }
  } else {
    res.status(400).send('Cannot friend yourself')
  }
})

router.delete('/friends/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const friendToRemove = await User.findById(req.params.id)
    await user.removeFriends(friendToRemove)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.get('/restaurants', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const restaurants = await user.getRestaurants()
    res.json(restaurants)
  } catch (err) {
    next(err)
  }
})

router.put('/restaurants', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const [restaurant] = await Restaurant.findOrCreate({
      where: {
        title: req.body.title,
        description: req.body.description,
        placeId: req.body.placeId
      }
    })
    const latLong = await getPlaceDetailsById(req.body.placeId);
    await restaurant.update(latLong)
    if (!await user.hasRestaurant(restaurant)) {
      await user.addRestaurant(restaurant)
      res.status(201).send(restaurant)
    } else {
      res.status(418).send('I\'m a teapot')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/restaurants/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const restToRemove = await Restaurant.findById(req.params.id)
    await user.removeRestaurants(restToRemove)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
