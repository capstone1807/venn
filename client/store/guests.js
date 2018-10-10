import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_GUESTS = 'GET_GUESTS'

/**
 * INITIAL STATE
 */
const defaultGuests = []

/**
 * ACTION CREATORS
 */
const getGuests = guests => ({
  type: GET_GUESTS,
  guests
})

/**
 * THUNK CREATORS
 */
export const fetchGuests = id => async dispatch => {
  try {
    const {data: guests} = await axios.get(`/api/events/${id}/guests`)
    dispatch(getGuests(guests))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultGuests, action) {
  switch (action.type) {
    case GET_GUESTS:
      return action.guests
    default:
      return state
  }
}
