import React from 'react'

import {Menu} from 'semantic-ui-react'

export const EventFilter = ({activeItem, handleFilterClick}) => {
  return (
    <div>
      <Menu text>
        <Menu.Item header>Filter By</Menu.Item>
        <Menu.Item
          name="allEvents"
          active={activeItem === 'allEvents'}
          onClick={handleFilterClick}
        />
        <Menu.Item
          name="myEvents"
          active={activeItem === 'myEvents'}
          onClick={handleFilterClick}
        />
      </Menu>
    </div>
  )
}

export default EventFilter