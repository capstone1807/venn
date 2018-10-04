const Sequelize = require('sequelize')
const db = require('../db')

const Restaurant = db.define('restaurant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  latitude: {
    // is this how we should save them?
    type: Sequelize.DECIMAL
  },
  longitude: {
    // is this how we should save them?
    type: Sequelize.DECIMAL
  },
  placeId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Restaurant
