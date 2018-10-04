const Sequelize = require('sequelize')
const db = require('../db')

const EventUser = db.define('event_user', {
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = EventUser
