import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_EVENT = 'GET_EVENT'


/**
 * INITIAL STATE
 */

const defaultEvent = {}

/**
 * ACTION CREATORS
 */

const getEvent = (currentEvent) => ({
  type: GET_EVENT,
  currentEvent
})

/**
 * THUNK CREATORS
 */

export const fetchEvent = id => async dispatch => {
  try {
    const {data: foundEvent} = await axios.get(`/api/events/${id}`)
    dispatch(getEvent(foundEvent))
  } catch (err){
    console.log(err)
  }
}

/**
 * REDUCER
 */

export default function (state = defaultEvent, action) {
  switch (action.type) {
    case GET_EVENT:
      return action.currentEvent
    default:
      return state
  }
}
