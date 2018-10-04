const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try{
    const user = await User.findById(req.user.id)
    const restaurants = await user.getRestaurants()
    res.json(restaurants)
  } catch(err){
    next(err)
  }
})
