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

EventRestaurant.getFinal = function(restaurantScoresArr) {
  // restaurantScoresArr is an array of objects which each contain a restaurantId and a score
  // filter array for highest scored restaurants
  const highscore = Math.max.apply(
    Math,
    restaurantScoresArr.map(function(obj) {
      return obj.score
    })
  )
  const finalRestaurants = restaurantScoresArr.filter(
    rest => parseFloat(rest.score) === highscore
  )
  // return floor of random * filteredarray length (if there is only one item, should return that item )
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
