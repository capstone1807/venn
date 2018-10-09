import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_FINAL_RESTAURANT = 'GET_FINAL_RESTAURANT'


/**
 * INITIAL STATE
 */

// OB/JL: could get bundled into `currentEvent`
const defaultValue = {
  restaurant: {}
}

/**
 * ACTION CREATORS
 */

const getEvent = (restaurant) => ({
  type: GET_FINAL_RESTAURANT,
  restaurant
})

/**
 * THUNK CREATORS
 */

export const fetchFinalRestaurant = id => async dispatch => {
  try {
    const {data: restaurant} = await axios.get(`/api/events/${id}/final-restaurant`)
    dispatch(getEvent(restaurant))
  } catch (err){
    console.log(err)
  }
}

/**
 * REDUCER
 */

export default function (state = defaultValue, action) {
  switch (action.type) {
    case GET_FINAL_RESTAURANT:
      return {...state, restaurant: action.restaurant}
    default:
      return state
  }
}
