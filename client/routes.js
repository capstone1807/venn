import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  Friends,
  CreateEvent,
  GuestRestaurantChoice,
  RestaurantsList,
  EventsList,
  EventDetail,
  NoData
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route
              exact
              path="/home"
              render={() => <Redirect to="/events" />}
            />
            <Route exact path="/" render={() => <Redirect to="/events" />} />

            <Route path="/friends" component={Friends} />
            <Route exact path="/restaurants" component={RestaurantsList} />
            <Route exact path="/events" component={EventsList} />
            <Route exact path="/events/new" component={CreateEvent} />
            <Route exact path="/events/:id" component={EventDetail} />
            <Route
              exact
              path="/events/:id/choices/restaurants"
              component={GuestRestaurantChoice}
            />
            <Route
              render={() => (
                <NoData iconName="exclamation" message="Page Not Found" />
              )}
            />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
