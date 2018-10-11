import React, {Fragment} from 'react'
import {Icon, Menu, Label, Image} from 'semantic-ui-react'
import styles from '../Utils/Global.css'
import history from '../../history'

const NavbarDesktop = ({
  firstName,
  isLoggedIn,
  handleLogout,
  events,
  needsResponse
}) => (
  <Menu borderless style={styles.menu}>
    <Menu.Item>
      <Image size="mini" src="/assets/venn-logo.png" />
    </Menu.Item>

    {isLoggedIn && (
      <Fragment>
        <Menu.Item onClick={() => history.push('/events')}>
          {events.length &&
            needsResponse > 0 && <Label color="red">{needsResponse}</Label>}
          <Icon name="calendar alternate" />
          <p style={styles.pTopTiny}>Events</p>
        </Menu.Item>
        <Menu.Item onClick={() => history.push('friends')}>
          <Icon name="users" /> Friends
        </Menu.Item>
        <Menu.Item onClick={() => history.push('/restaurants')}>
          <Icon name="food" /> Restaurants
        </Menu.Item>
      </Fragment>
    )}

    <Menu.Menu position="right">
      {isLoggedIn ? (
        <Fragment>
          <Menu.Item>
            <p>Welcome {firstName}</p>
          </Menu.Item>
          <Menu.Item onClick={handleLogout}>
            <Icon name="sign-out" /> Log Out
          </Menu.Item>
        </Fragment>
      ) : (
        <Menu.Item onClick={() => history.push('/login')}>
          <Icon name="sign-in" /> Log In
        </Menu.Item>
      )}
    </Menu.Menu>
  </Menu>
)

export default NavbarDesktop
