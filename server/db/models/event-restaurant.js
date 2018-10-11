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
  return finalRestaurants[Math.floor(Math.random() * finalRestaurants.length)]
    .restaurantId
}

EventRestaurant.checkForFinalRestaurant = async eventUser => {
  console.log('**1**')
  const currentEvent = await db.model('event').findById(eventUser.eventId)
  const guests = await currentEvent.getUsers()

  console.log('**2**')
  if (!guests.some(guest => !guest.event_user.hasResponded)) {
    currentEvent.update({
      isPending: false
    })
    console.log('**3**')

    const restaurantScores = await EventRestaurant.findAll({
      attributes: ['score', 'restaurantId'],
      where: {
        eventId: currentEvent.id
      }
    })

    console.log('**4**')
    const finalRestId = await EventRestaurant.getFinal(restaurantScores)
    console.log('**5**')
    await EventRestaurant.update(
      {
        isFinal: true
      },
      {
        where: {
          restaurantId: finalRestId,
          eventId: eventUser.eventId
        }
      }
    )
  }
}

module.exports = EventRestaurant
