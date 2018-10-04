const User = require('./user')
const Event = require('./event')
const Restaurant = require('./restaurants')
const EventRestaurant = require('./event-restaurant')
const EventUser = require('./event-user')

User.belongsToMany(User, {as: 'friends', through: 'friendship'})

User.belongsToMany(Restaurant, {through: 'fav_restaurants'})

Event.belongsToMany(Restaurant, {through: EventRestaurant})
Restaurant.belongsToMany(Event, {through: EventRestaurant})

Event.belongsToMany(User, {through: EventUser})
User.belongsToMany(Event, {through: EventUser})

module.exports = {
  User,
  Event,
  Restaurant,
  EventRestaurant,
  EventUser
}
