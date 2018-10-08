import React from 'react'
import {Menu} from 'semantic-ui-react'

const EventFilterMenuItem = ({name, activeItem, handleFilterClick}) => {
  return (
    <Menu.Item
      name={name}
      color="orange"
      active={activeItem === name}
      onClick={handleFilterClick}
    />
  )
}

export const EventFilter = ({activeItem, handleFilterClick}) => {
  return (
    <Menu text size="large">
      <Menu.Item header>Filter By</Menu.Item>
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
