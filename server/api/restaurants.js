const router = require('express').Router()
const {User, Restaurant} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const restaurants = await user.getRestaurants()
    res.json(restaurants)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    console.log('REQ.BODY*******', req.body)
    const user = await User.findById(req.user.id)
    const restaurant = await Restaurant.create(req.body)
    await user.addRestaurant(restaurant)
    res.status(201).send(restaurant)
  } catch (err) {
    next(err)
  }
})
