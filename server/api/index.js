const router = require('express').Router()
module.exports = router

router.use('/events', require('./events'))
router.use('/me', require('./me'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
