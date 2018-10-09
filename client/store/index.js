import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import users from './users'
import friends from './friends'
import restaurants from './restaurants'
import events from './events'
import currentEvent from './current-event'
import eventRestaurants from './event-restaurants'
import final from './final'

const reducer = combineReducers({
  user,
  users,
  friends,
  events,
  currentEvent,
  restaurants,
  eventRestaurants,
  final
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './users'
export * from './friends'
export * from './events'
export * from './current-event'
export * from './restaurants'
export * from './event-restaurants'
export * from './final'
