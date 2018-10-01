const User = require('./user')

User.belongsToMany(User, {as: 'Friends', through: 'friendship'})

module.exports = {
  User
}
