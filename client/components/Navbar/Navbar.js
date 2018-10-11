import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import history from '../../history'
import {logout, fetchEvents} from '../../store'
import {Responsive} from 'semantic-ui-react'
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'

const NavBarChildren = ({children}) => <Fragment>{children}</Fragment>

class NavBar extends Component {
  state = {visible: false}

  async componentDidMount() {
    this.props.isLoggedIn && (await this.props.getEvents())
  }

  handlePusher = () => {
    const {visible} = this.state

    if (visible) this.setState({visible: false})
  }

  handleToggle = () => this.setState({visible: !this.state.visible})

  handleLogout = () => {
    this.props.logout()
    history.push('/login')
  }

  render() {
    const {isLoggedIn, firstName, events, children} = this.props
    const {visible} = this.state
    const needsResponse = this.props.events.filter(
      event => !event.event_user.hasResponded
    ).length

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavbarMobile
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            visible={visible}
            isLoggedIn={isLoggedIn}
            firstName={firstName}
            events={events}
            needsResponse={needsResponse}
            handleLogout={this.handleLogout}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavbarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavbarDesktop
            firstName={firstName}
            isLoggedIn={isLoggedIn}
            handleLogout={this.handleLogout}
            events={events}
            needsResponse={needsResponse}
          />
          <NavBarChildren>{children}</NavBarChildren>
        </Responsive>
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

export default withRouter(connect(mapState, mapDispatch)(NavBar))

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string
}
