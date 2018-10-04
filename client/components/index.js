/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as AddFriend} from './friends/add-friend'
export {default as CreateEvent} from './new-event/create-event'
export {default as GuestRestaurantChoice} from './pending-event/restaurant'
export {default as FavoriteRestaurants} from './restaurants/fave-restaurants'
export {Login, Signup} from './auth-form'
export {default as RestaurantsAdd} from './Restaurants/RestaurantsAdd'
export {default as RestaurantsList} from './Restaurants/RestaurantsList'
