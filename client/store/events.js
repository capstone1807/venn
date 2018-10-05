import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS'
const CREATE_EVENT = 'CREATE_EVENT'

/**
 * ACTION CREATORS
 */
const getEvents = events => ({type: GET_EVENTS, events})

/**
 * ACTION CREATORS
 */

const createEvent = () => ({
  type: CREATE_EVENT,
  event
})

/**
 * THUNK CREATORS
 */
export const fetchEvents = () => async dispatch => {
  try {
    // const {data: events} = await axios.get(`/api/me/events`)
    const events = [
      {
        id: 1,
        name: 'F&F Night',
        description: 'Friends and Family',
        isAdmin: false,
        status: 'pending'
      },
      {
        id: 2,
        name: 'BDAY Celebration for RLD',
        description:
          'Bring to the table win-win survival strategies to ensure proactive domination.',
        isAdmin: true,
        status: 'past'
      },
      {
        id: 3,
        name: 'BDAY Celebration for EB',
        description: 'Better late than never',
        isAdmin: false,
        status: 'upcoming'
      }
    ]
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
