import axios from 'axios'

/**
 * ACTION TYPES
 */

const CREATE_EVENT = 'CREATE_EVENT'

/**
 * INITIAL STATE
 */

const defaultEvents = []

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

export const postEvent = newEvent => async dispatch => {
  try {
    const { data: event } = await axios.post(`/api/events/`, newEvent)
    dispatch(createEvent(event))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultEvents, action) {
  switch (action.type) {
    case CREATE_EVENT:
      return [...state, action.event]
    default:
      return state
  }
}
