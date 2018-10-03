const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'firstName', 'lastName', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// OB/JL: non-standard / non-RESTful route name here
/*
GET /api/users/friends looks like "all friends of all users" but it isn't
instead could be
GET /api/current-user/friends looks like "all friends of currently logged in user"
...ditto for the routes below
*/
router.get('/friends', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const friends = await user.getFriends()
    res.json(friends)
  } catch (err) {
    next(err)
  }
})

//should we change this to 'put'?
// OB/JL: POST v PUT, I think PUT because the route is / should be idempotent
router.post('/friends', async (req, res, next) => {
  // OB/JL: could be a validation you add to your requelize model
  if (req.body.friendId !== req.user.id) {
    try {
      const user = await User.findById(req.user.id)
      const newFriend = await User.findById(req.body.friendId)
      // OB/JL: might need to be .addFriend instead of .addFriends...?
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
