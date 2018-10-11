import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_EVENT = 'GET_EVENT'
const SET_STATUS_TO_RESPONDED = 'SET_STATUS_TO_RESPONDED'
const CLOSE_EVENT = 'CLOSE_EVENT'

/**
 * INITIAL STATE
 */

const defaultEvent = {}

/**
 * ACTION CREATORS
 */

const getEvent = currentEvent => ({
  type: GET_EVENT,
  currentEvent
})

const setStatusToResponded = event => ({
  type: SET_STATUS_TO_RESPONDED,
  event
})
const closeEvent = event => ({
  type: CLOSE_EVENT,
  event
})

/**
 * THUNK CREATORS
 */

export const fetchEvent = id => async dispatch => {
  try {
    const {data: foundEvent} = await axios.get(`/api/events/${id}`)
    dispatch(getEvent(foundEvent))
  } catch (err) {
    console.log(err)
  }
}

export const updateRespondedStatus = eventId => async dispatch => {
  try {
    const event = await axios.put(`/api/events/${eventId}/pending`)
    dispatch(setStatusToResponded(event))
  } catch (err) {
    console.log(err)
  }
}

export const lockInEvent = eventId => async dispatch => {
  try {
    const {data: event} = await axios.put(`/api/events/${eventId}/close`)
    dispatch(closeEvent(event))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function(state = defaultEvent, action) {
  switch (action.type) {
    case GET_EVENT:
      return action.currentEvent
    case CLOSE_EVENT:
      return action.event
    case SET_STATUS_TO_RESPONDED:
      return action.event
    default:
      return state
  }
}
