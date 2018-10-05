import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_FRIENDS = 'GET_FRIENDS'
const ADD_FRIEND = 'ADD_FRIEND'

/**
 * INITIAL STATE
 */
const defaultFriends = []

/**
 * ACTION CREATORS
 */

const getFriends = friends => ({
  type: GET_FRIENDS,
  friends
})
const addNewFriend = friend => ({
  type: ADD_FRIEND,
  friend
})

/**
 * THUNK CREATORS
 */

export const fetchFriends = () => async dispatch => {
  try {
    const {data: friends} = await axios.get(`/api/users/friends`)
    dispatch(getFriends(friends))
  } catch (err) {
    console.error(err)
  }
}

export const addFriend = id => async dispatch => {
  try {
    const {data: friend} = await axios.post(`/api/users/friends`, {friendId: id})
    dispatch(addNewFriend(friend))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultFriends, action) {
  switch (action.type) {
    case GET_FRIENDS:
      return action.friends
    case ADD_FRIEND:
      return [...state, action.friend]
    default:
      return state
  }
}
