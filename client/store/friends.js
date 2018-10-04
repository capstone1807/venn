import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_USERS = 'GET_USERS'
const GET_FRIENDS = 'GET_FRIENDS'
const ADD_FRIEND = 'ADD_FRIEND'

/**
 * INITIAL STATE
 */

// OB/JL: looks like multiple reducers
const defaultUsers = {
  users: [],
  friends: []
}

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const getFriends = friends => ({type: GET_FRIENDS, friends})
const addNewFriend = friend => ({type: ADD_FRIEND, friend})

/**
 * THUNK CREATORS
 */

export const fetchUsersFromDB = () => async dispatch => {
  try {
    const {data: users} = await axios.get(`/api/users/`)
    dispatch(getUsers(users))
  } catch (err) {
    console.error(err)
  }
}

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
export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: action.users}
    case GET_FRIENDS:
      return {...state, friends: action.friends}
    case ADD_FRIEND:
      return {...state, friends: [...state.friends, action.friend]}
    default:
      return state
  }
}
