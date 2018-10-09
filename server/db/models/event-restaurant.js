const Sequelize = require('sequelize')
const db = require('../db')
const Event = require('./event')

console.log('Event line 4', Event)

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

const checkForFinalRestaurant = async eventRestaurant => {
  console.log('checkForFinalRestaurant')

  const currentEvent = await Event.findById(eventRestaurant.eventId)
  const guests = await currentEvent.getUsers()

  console.log(
    'guest responded',
    guests.filter(guest => {
      console.log(guest.event_user)
      return !guest.event_user.hasResponded
    }).length === 0
  )

  // if all guests have responded
  if (guests.filter(guest => !guest.event_user.hasResponded).length === 0) {
    console.log('all guests responded')

    // -> schedule / close event
    currentEvent.update({isPending: false})
    console.log('update final restaurant on current event', currentEvent)
    // -> calculate final restuarant
    const eventRests = await EventRestaurant.findAll({
      attributes: ['score', 'restaurantId'],
      where: {eventId: currentEvent.id}
    })

    console.log('restaurants of this event', eventRests)
    const finalRestId = EventRestaurant.getFinal(eventRests)
    console.log('final restaurant id', finalRestId)

    // -> set isFinal to true on this restaurant
    const finalEventRest = eventRests.find(
      er => er.restaurantId === finalRestId
    )

    console.log('final restaurant', finalEventRest)
    finalEventRest.update({isFinal: true})
    console.log('finalEventRest update', finalEventRest)
  }
}

EventRestaurant.afterUpdate(eventRestaurant => {
  console.log('After Update')

  checkForFinalRestaurant(eventRestaurant)
})

EventRestaurant.afterCreate(eventRestaurant => {
  console.log('After Create')
  checkForFinalRestaurant(eventRestaurant)
})

module.exports = EventRestaurant
