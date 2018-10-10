const Sequelize = require('sequelize')
const db = require('../db')
const EventUser = require('./event-user')
const EventRestaurant = require('./event-restaurant')
const User = require('./user')
const Restaurant = require('./restaurants')

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isPending: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  isPast: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})

Event.prototype.getCreator = async function() {
  const {userId} = await EventUser.findOne({
    where: {
      eventId: this.id,
      isAdmin: true
    }
  })
  const creator = await User.findById(userId)
  return creator
}

Event.prototype.getFinalRestaurant = async function() {
  if (this.isPending === false) {
    const {restaurantId} = await EventRestaurant.findOne({
      where: {
        eventId: this.id,
        isFinal: true
      }
    })
    const finalRestaurant = await Restaurant.findById(restaurantId)
    return finalRestaurant
  }
}

module.exports = Event
