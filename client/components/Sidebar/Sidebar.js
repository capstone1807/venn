import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {logout, fetchEvents} from '../../store'
import App from '../../app'
import {Icon, Menu, Sidebar, Label, Container} from 'semantic-ui-react'
import {Header, Footer} from '../../components'
import history from '../../history'
import styles from '../Utils/Global.css'

class SidebarMenu extends Component {
  state = {visible: false}

  async componentDidMount() {
    await this.props.getEvents()
  }

  handleButtonClick = () =>
    this.setState(prevState => ({visible: !prevState.visible}))

  handleSidebarHide = () => this.setState({visible: false})

  handleLinks = to => {
    this.handleButtonClick()
    history.push(to)
  }

  handleLogout = () => {
    this.handleLinks('/login')
    this.props.logout()
  }

  render() {
    const {visible} = this.state
    const {isLoggedIn, firstName, events} = this.props
    const needsResponse = this.props.events.filter(
      event => !event.event_user.hasResponded
    ).length

    return (
      <div>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width="thin"
          >
            {isLoggedIn && (
              <Fragment>
                <Menu.Item>
                  <p>Welcome, {firstName}</p>
                </Menu.Item>
                <Menu.Item onClick={() => this.handleLinks('/events')}>
                  {events.length &&
                    needsResponse > 0 && (
                      <Label color="red">{needsResponse}</Label>
                    )}
                  <Icon name="calendar alternate" />
                  <p style={styles.pTopTiny}>Events</p>
                </Menu.Item>
                <Menu.Item onClick={() => this.handleLinks('/friends')}>
                  <Icon name="users" /> Friends
                </Menu.Item>
                <Menu.Item onClick={() => this.handleLinks('/restaurants')}>
                  <Icon name="food" /> Restaurants
                </Menu.Item>
              </Fragment>
            )}

            {isLoggedIn ? (
              <Menu.Item onClick={this.handleLogout}>
                <Icon name="sign-out" /> Log Out
              </Menu.Item>
            ) : (
              <Menu.Item onClick={() => this.handleLinks('/login')}>
                <Icon name="sign-in" /> Log In
              </Menu.Item>
            )}
          </Sidebar>
          <Sidebar.Pusher dimmed={visible}>
            <Header handleButtonClick={this.handleButtonClick} />
            <App />
            <Footer />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName,
    events: state.events
  }
}

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout()),
  getEvents: () => dispatch(fetchEvents())
})

export default withRouter(connect(mapState, mapDispatch)(SidebarMenu))

/**
 * PROP TYPES
 */
SidebarMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string
}
