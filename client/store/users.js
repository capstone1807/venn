import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_USERS = 'GET_USERS'
const GET_GUESTS = 'GET_GUESTS'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const getUsers = users => ({
  type: GET_USERS,
  users
})

const getGuests = guests => ({
  type: GET_GUESTS,
  guests
})

/**
 * THUNK CREATORS
 */

//// change this all to 'not friends'
export const fetchUsersFromDB = () => async dispatch => {
  try {
    const {data: users} = await axios.get(`/api/me/notfriends`)
    dispatch(getUsers(users))
  } catch (err) {
    console.error(err)
  }
}

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
export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case GET_GUESTS:
      return action.guests
    default:
      return state
  }
}
