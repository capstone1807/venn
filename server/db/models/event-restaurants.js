const Sequelize = require('sequelize')
const db = require('../db')

const EventRestaurants = db.define('event_restaurants', {
  score: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  isFinal: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

EventRestaurants.prototype.updateScore = function(importance) {
  this.score = parseFloat(this.score) + parseFloat(importance)
  return this.score
}

module.exports = EventRestaurants
