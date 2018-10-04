import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_RESTAURANTS = 'GET_RESTAURANTS'

/**
 * ACTION CREATORS
 */
const getRestaurants = restaurants => ({type: GET_RESTAURANTS, restaurants})

/**
 * THUNK CREATORS
 */

export const fetchRestaurants = () => async dispatch => {
  try {
    const {data: restaurants} = await axios.get(`/api/restaurants`)
    dispatch(getRestaurants(restaurants))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_RESTAURANTS:
      return action.restaurants

    default:
      return state
  }
}
