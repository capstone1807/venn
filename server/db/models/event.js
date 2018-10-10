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
  const {userId} = await db.model('event_user').findOne({
    where: {
      eventId: this.id,
      isAdmin: true
    }
  })
  const creator = await db.model('user').findById(userId)
  return creator
}

Event.prototype.getFinalRestaurant = async function() {
  if (this.isPending === false) {
    const {restaurantId} = await db.model('event_restaurant').findOne({
      where: {
        eventId: this.id,
        isFinal: true
      }
    })
    const finalRestaurant = await db.model('restaurant').findById(restaurantId)
    return finalRestaurant
  }
}

module.exports = Event
