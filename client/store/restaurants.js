import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_RESTAURANTS = 'GET_RESTAURANTS'
const ADD_RESTAURANT = 'ADD_RESTAURANT'

/**
 * ACTION CREATORS
 */
const getRestaurants = restaurants => ({type: GET_RESTAURANTS, restaurants})
const addRestaurant = restaurant => ({type: ADD_RESTAURANT, restaurant})
/**
 * THUNK CREATORS
 */

export const fetchRestaurants = () => async dispatch => {
  try {
    const {data: restaurants} = await axios.get(`/api/me/restaurants`)
    dispatch(getRestaurants(restaurants))
  } catch (err) {
    console.error(err)
  }
}

export const saveRestaurant = rest => async dispatch => {
  try {
    const {data: restaurant} = await axios.put(`/api/me/restaurants`,
    {title: rest.title, description: rest.description, placeId: rest.source.place_id})
    dispatch(addRestaurant(restaurant))
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
    case ADD_RESTAURANT:
      return [...state, action.restaurant]
    default:
      return state
  }
}
