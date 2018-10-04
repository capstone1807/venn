const Sequelize = require('sequelize')
const db = require('../db')

const EventRestaurants = db.define('event_restaurants', {
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  restaurantId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  score: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  final:{
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

EventRestaurants.prototype.updateScore = function (importance){
  this.score =  parseFloat(this.score) + parseFloat(importance)
  return this.score
}

module.exports = EventRestaurants
