import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS'
const CREATE_EVENT = 'CREATE_EVENT'

/**
 * ACTION CREATORS
 */
const getEvents = events => ({
  type: GET_EVENTS,
  events
})
const createEvent = event => ({
  type: CREATE_EVENT,
  event
})

/**
 * THUNK CREATORS
 */
export const fetchEvents = () => async dispatch => {
  try {
    const {data: events} = await axios.get(`/api/me/events`)
    dispatch(getEvents(events))
  } catch (err) {
    console.error(err)
  }
}

export const postEvent = newEvent => async dispatch => {
  try {
    const {data: event} = await axios.post(`/api/events/`, newEvent)
    dispatch(createEvent(event))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case CREATE_EVENT:
      return [...state, action.event]
    case GET_EVENTS:
      return action.events
    default:
      return state
  }
}
