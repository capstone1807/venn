const Sequelize = require('sequelize')
const db = require('../db')
const Event = require('./event')

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

EventRestaurant.getFinal = function(restaurantScoresArr) {
  const highscore = Math.max.apply(
    Math,
    restaurantScoresArr.map(function(obj) {
      return obj.score
    })
  )
  const finalRestaurants = restaurantScoresArr.filter(
    rest => parseFloat(rest.score) === highscore
  )
  return finalRestaurants[Math.floor(Math.random() * finalRestaurants.length)]
    .restaurantId
}

EventRestaurant.checkForFinalRestaurant = async eventUser => {
  const currentEvent = await Event.findById(eventUser.eventId)
  const guests = await currentEvent.getUsers()

  if (guests.filter(guest => !guest.event_user.hasResponded).length === 0) {
    currentEvent.update({isPending: false})
    const restaurantScores = await EventRestaurant.findAll({
      attributes: ['score', 'restaurantId'],
      where: {eventId: currentEvent.id}
    })

    const finalRestId = EventRestaurant.getFinal(restaurantScores)
    await EventRestaurant.update(
      {
        isFinal: true
      },
      {
        where: {
          restaurantId: finalRestId,
          eventId: currentEvent.id
        }
      }
    )
  }
}

module.exports = EventRestaurant
