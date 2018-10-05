const Sequelize = require('sequelize')
const db = require('../db')

const EventUser = db.define('event_user', {
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

EventUser.prototype.setAdmin = function(){
  console.log(this.userId, this.eventId)
  this.isAdmin = !this.isAdmin
}

module.exports = EventUser
