const router = require('express').Router()
const {Event, User} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    // const user = await User.findById(req.user.id)
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
