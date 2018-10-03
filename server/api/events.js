const router = require('express').Router()
const {Event, User} = require('../db/models')
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
