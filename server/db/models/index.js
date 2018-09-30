const User = require('./user')

User.belongsToMany(User, {as: 'Friends', through: 'friends'})

module.exports = {
  User
}
