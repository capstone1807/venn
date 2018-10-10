import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {logout} from '../../store'
import App from '../../app'
import {Icon, Menu, Sidebar} from 'semantic-ui-react'
import {Header, Footer} from '../../components'
import history from '../../history'

class SidebarMenu extends Component {
  state = {visible: false}

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
    const {isLoggedIn, firstName} = this.props

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
                  <Icon name="calendar alternate" /> Events
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
    firstName: state.user.firstName
  }
}

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
})

export default withRouter(connect(mapState, mapDispatch)(SidebarMenu))

/**
 * PROP TYPES
 */
SidebarMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string
}
