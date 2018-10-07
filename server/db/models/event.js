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
  description: {
    type: Sequelize.TEXT,
  },
  isPrivate: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  isPending: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  isPast: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
})

module.exports = Event
