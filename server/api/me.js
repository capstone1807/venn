const router = require('express').Router()
const {User, Restaurant} = require('../db/models')
const db = require('../../server/db')
const Friendship = db.model('friendship')
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
    const friendToRemove = await User.findById(req.params.id)
    console.log(friendToRemove)
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
    const restaurant = await Restaurant.create(req.body)
    await user.addRestaurant(restaurant)
    res.status(201).send(restaurant)
  } catch (err) {
    next(err)
  }
})
