const router = require('express').Router()
const {User, Restaurant} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = router

router.get('/events', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const events = await user.getEvents()
    res.json(events)
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
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/friends', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const friends = await user.getFriends()
    console.log('friends in route', friends)
    res.json(friends)
  } catch (err) {
    next(err)
  }
})

router.put('/friends', async (req, res, next) => {
  if (req.body.friendId !== req.user.id) {
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
    await user.removeFriends({where: {friendId: req.params.id}})
    res.status(204).end()
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
    const restaurant = await Restaurant.create(req.body)
    await user.addRestaurant(restaurant)
    res.status(201).send(restaurant)
  } catch (err) {
    next(err)
  }
})
