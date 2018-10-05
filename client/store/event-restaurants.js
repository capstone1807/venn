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

const updateRestaurantsOnEvent = (eventId, restaurantKeys) => ({
  type: UPDATE_RESTAURANTS_ON_EVENT,
  eventId,
  restaurantKeys
})


/**
 * THUNK CREATORS
 */

export const updateEventRestaurants = (eventId, restaurantKeys, importance) => async dispatch => {
  try {
    await axios.post(`/api/events/${eventId}/restaurants`, {restaurantKeys, importance})
    dispatch(updateRestaurantsOnEvent(eventId, restaurantKeys))
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
      return [...state, {eventId: action.eventId, restaurants: action.restaurantKeys}]
    default:
      return state
  }
}
