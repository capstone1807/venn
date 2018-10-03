const User = require('./user')
const Event = require('./event')

User.belongsToMany(User, {as: 'friends', through: 'friendship'})

Event.belongsToMany(User, {through: 'event_guest'})
User.belongsToMany(Event, {as: 'guests', through: 'event_guest'})

Event.belongsTo(User, {as: 'creator'})
// User.hasMany(Event, {foreignKey: 'creatorId'})
// ^ do we need this?

module.exports = {
  User,
  Event
}
