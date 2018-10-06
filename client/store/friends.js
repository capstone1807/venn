import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_FRIENDS = 'GET_FRIENDS'
const ADD_FRIEND = 'ADD_FRIEND'
const DELETE_FRIEND = 'DELETE_FRIEND'

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

const deleteFriend = friendId => ({
  type: DELETE_FRIEND,
  friendId
})
/**
 * THUNK CREATORS
 */

export const fetchFriends = () => async dispatch => {
  try {
    const {data: friends} = await axios.get(`/api/me/friends`)
    dispatch(getFriends(friends))
  } catch (err) {
    console.error(err)
  }
}

export const addFriend = id => async dispatch => {
  try {
    const {data: friend} = await axios.put(`/api/me/friends`, {friendId: id})
    dispatch(addNewFriend(friend))
  } catch (err) {
    console.error(err)
  }
}

export const removeFriend = id => async dispatch => {
  try {
    await axios.delete(`/api/me/friends/
    ${id}`)
    dispatch(deleteFriend(id))
  } catch (err) {
    console.error(err)
  }
}

/**DELETE_FRIEND
 * REDUCER
 */
export default function(state = defaultFriends, action) {
  switch (action.type) {
    case GET_FRIENDS:
      return action.friends
    case ADD_FRIEND:
      return [...state, action.friend]
    case DELETE_FRIEND:
      return state.filter(friend => friend.id !== action.friendId)
    default:
      return state
  }
}
