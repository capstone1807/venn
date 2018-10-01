const User = require('./user')

User.belongsToMany(User, {as: 'Friend', through: 'friendship'})
module.exports = {
  User
}
