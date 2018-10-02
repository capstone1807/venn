const router = require('express').Router()
const {Event, User} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id)
      const newEvent = await Event.create({
        // know name of event
        name: req.body.eventName,
        // know private
        isPrivate: req.body.isPrivate
      })
      // know friends invited
      await newEvent.addGuests(req.body.guests)
      // know creator
      await newEvent.addCreator(user)
      res.json(newEvent)
    } catch (err) {
      next(err)
    }
})
