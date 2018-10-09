import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_EVENT = 'GET_EVENT'
const SET_STATUS_TO_RESPONDED = 'SET_STATUS_TO_RESPONDED'
const SET_STATUS_TO_SCHEDULED = 'SET_STATUS_TO_SCHEDULED'


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

const setStatusToResponded = (event) => ({
  type: SET_STATUS_TO_RESPONDED,
  event
})

const setStatusToScheduled = (event) => ({
  type: SET_STATUS_TO_SCHEDULED,
  event
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

export const updateRespondedStatus = (eventId) => async dispatch => {
  try {
    const event = await axios.put(`/api/events/${eventId}/pending`)
    dispatch(setStatusToResponded(event))
  } catch (err){
    console.log(err)
  }
}

export const lockInEvent = (eventId) => async dispatch => {
  try {
    const event = await axios.put(`/api/events/${eventId}/scheduled`)
    dispatch(setStatusToScheduled(event))
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
    case SET_STATUS_TO_RESPONDED:
      return action.event
    case SET_STATUS_TO_SCHEDULED:
      return action.event
    default:
      return state
  }
}
