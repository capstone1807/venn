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
    // const {data: restaurants} = await axios.get(`/api/me/restaurants`)
    const restaurants = [
      {
        header: 'Dairy Queen',
        description: 'blah blah',
        meta: 'ROI: 30%'
      },
      {
        header: 'IHOP',
        description: 'blah blah',
        meta: 'ROI: 34%'
      },
      {
        header: 'Chuck E Cheese',
        description: 'blah blahblah blahblah blahblah blah',
        meta: 'ROI: 27%'
      }
    ]
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
