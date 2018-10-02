const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  guests: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  isPrivate: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Event
