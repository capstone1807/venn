const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
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
    res.json(friends)
  } catch (err) {
    next(err)
  }
})

router.post('/friends', async (req, res, next) => {
  if (req.body.friendId !== req.user.id) {
    try {
      const user = await User.findById(req.user.id)
      const result = await user.setFriends(req.body.friendId)
      res.status(201).send(result)
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
    await user.removeFriends(req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
