import axios from 'axios'

/**
 * ACTION TYPES
 */

const UPDATE_RESTAURANTS_ON_EVENT = 'UPDATE_RESTAURANTS_ON_EVENT'

/**
 * INITIAL STATE
 */

const defaultEventRestaurants = [{
  eventId: 0,
  restaurants: []
}]

/**
 * ACTION CREATORS
 */

const updateRestaurantsOnEvent = (eventId, restaurants) => ({
  type: UPDATE_RESTAURANTS_ON_EVENT,
  eventId,
  restaurants
})


/**
 * THUNK CREATORS
 */

export const updateEventRestaurants = (eventId, restaurants, importance) => async dispatch => {
  try {
    await axios.post(`/api/events/${eventId}/restaurants`, {restaurants, importance})
    dispatch(updateRestaurantsOnEvent(eventId, restaurants))
  } catch (err){
    console.log(err)
  }
}

/**
 * REDUCER
 */

export default function (state = defaultEventRestaurants, action) {
  switch (action.type) {
    case UPDATE_RESTAURANTS_ON_EVENT:
      return [...state, {eventId: action.eventId, restaurants: action.restaurants}]
    default:
      return state
  }
}
