import React from 'react'
import {Menu} from 'semantic-ui-react'
import styles from '../Utils/Global.css'

const EventFilterMenuItem = ({name, activeItem, handleFilterClick}) => {
  return (
    <Menu.Item
      name={name}
      active={activeItem === name}
      onClick={handleFilterClick}
    />
  )
}

export const EventFilter = ({activeItem, handleFilterClick}) => {
  return (
    <Menu size="large" pointing secondary>
      <Menu.Item header>FILTER BY: </Menu.Item>
      <EventFilterMenuItem
        name="allEvents"
        activeItem={activeItem}
        handleFilterClick={handleFilterClick}
      />
      <EventFilterMenuItem
        name="pending"
        activeItem={activeItem}
        handleFilterClick={handleFilterClick}
      />
      <EventFilterMenuItem
        name="scheduled"
        activeItem={activeItem}
        handleFilterClick={handleFilterClick}
      />
      <EventFilterMenuItem
        name="past"
        activeItem={activeItem}
        handleFilterClick={handleFilterClick}
      />
      <EventFilterMenuItem
        name="myEvents"
        activeItem={activeItem}
        handleFilterClick={handleFilterClick}
      />
    </Menu>
  )
}

export default EventFilter
