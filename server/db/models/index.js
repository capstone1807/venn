const User = require('./user')
const Event = require('./event')
const Restaurant = require('./restaurants')

User.belongsToMany(User, {as: 'friends', through: 'friendship'})

User.belongsToMany(Restaurant, {through: 'fav_restaurants'})
// what we want
// User.hasMany(Restaurant, {through: 'fav_restaurants'})
// Restaurant.belongsToMany(User)

Event.belongsToMany(User, {through: 'event_guest'})
User.belongsToMany(Event, {as: 'guests', through: 'event_guest'})

Event.belongsTo(User, {as: 'creator'})
// User.hasMany(Event, {foreignKey: 'creatorId'})
// ^ do we need this?

module.exports = {
  User,
  Event,
  Restaurant
}
