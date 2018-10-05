const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/events', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const events = await user.getEvents()
    console.log(events)
    res.json(events)
  } catch (err) {
    next(err)
  }
})
