const User = require('./user')
const Event = require('./event')

User.belongsToMany(User, {as: 'friends', through: 'friendship'})

Event.belongsToMany(User, {through: 'event_guest'})
// OB/JL: user instances will have .guests I think...?
/*
const user = await User.findById(1, {
  include: [{
    model: Event,
    as: 'guests'
  }]
});
console.log(user.guests); // an array of event instances
*/
User.belongsToMany(Event, {as: 'guests', through: 'event_guest'})

Event.belongsTo(User, {as: 'creator'})
// User.hasMany(Event, {foreignKey: 'creatorId'})
// ^ do we need this? // OB: not necessarily

module.exports = {
  User,
  Event
}
