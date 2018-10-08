import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import App from '../../app'
import {Icon, Menu, Sidebar} from 'semantic-ui-react'
import {Header, Footer} from '../../components'

class SidebarMenu extends Component {
  state = {visible: false}

  handleButtonClick = () =>
    this.setState(prevState => ({visible: !prevState.visible}))

  handleSidebarHide = () => this.setState({visible: false})

  render() {
    const {visible} = this.state
    const {isLoggedIn, handleClick} = this.props

    return (
      <div>
        <Icon name="bars" onClick={this.handleButtonClick} />

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
            <Menu.Item>
              <Link to="/events">
                <Icon name="calendar alternate" /> Events
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/friends">
                <Icon name="users" /> Friends
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/restaurants">
                <Icon name="food" /> Restaurants
              </Link>
            </Menu.Item>
            {isLoggedIn ? (
              <Menu.Item>
                <Link to="/login" onClick={handleClick}>
                  <Icon name="log out" /> Log Out
                </Link>
              </Menu.Item>
            ) : (
              <Menu.Item>
                <Link to="/login" onClick={handleClick}>
                  <Icon name="log out" /> Log In
                </Link>
              </Menu.Item>
            )}
          </Sidebar>
          <Sidebar.Pusher dimmed={visible}>
            <Header />
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(SidebarMenu))

/**
 * PROP TYPES
 */
SidebarMenu.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
