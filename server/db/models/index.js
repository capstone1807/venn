const User = require('./user')
const Event = require('./event')
const Restaurant = require('./restaurants')
const EventRestaurant = require('./event-restaurants')

User.belongsToMany(User, {as: 'friends', through: 'friendship'})

User.belongsToMany(Restaurant, {through: 'fav_restaurants'})

Event.belongsToMany(User, {through: 'event_user'}) // -> model object
User.belongsToMany(Event, {through: 'event_user'})

// Event.belongsTo(User, {as: 'creator'})
// isAdmin

// Event.belongsToMany(Restaurant, {through: EventRestaurant})
EventRestaurant.belongsTo(User)
EventRestaurant.belongsTo(Event)
EventRestaurant.belongsTo(Restaurant)

module.exports = {
  User,
  Event,
  Restaurant,
  EventRestaurant
}
