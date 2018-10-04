const Sequelize = require('sequelize')
const db = require('../db')

const EventRestaurant = db.define('event_restaurant', {
  score: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  isFinal: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

EventRestaurant.prototype.updateScore = function(importance) {
  this.score = parseFloat(this.score) + parseFloat(importance)
  return this.score
}

module.exports = EventRestaurant
