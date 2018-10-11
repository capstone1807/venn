import React from 'react'
import {Image, Menu, Icon, Sidebar} from 'semantic-ui-react'
import NavbarMobileItems from './NavbarMobileItems'

const NavbarMobile = ({
  children,
  onPusherClick,
  onToggle,
  visible,
  isLoggedIn,
  firstName,
  events,
  needsResponse,
  handleLogout
}) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      vertical
      visible={visible}
    >
      <NavbarMobileItems
        isLoggedIn={isLoggedIn}
        firstName={firstName}
        events={events}
        needsResponse={needsResponse}
        handleLogout={handleLogout}
      />
    </Sidebar>
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{minHeight: '100vh'}}
    >
      <Menu>
        <Menu.Item onClick={onToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Item>
          <Image size="mini" src="/assets/venn-logo.png" />
        </Menu.Item>
      </Menu>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
)
export default NavbarMobile
