import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_USERS = 'GET_USERS'

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

/**
 * REDUCER
 */
export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
