import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Icon} from 'semantic-ui-react'

const EventAddButton = props => {
  return (
    <Button color="google plus" as={Link} to="/events/new">
      <Icon name="plus" />
      Add Event
    </Button>
  )
}

export default EventAddButton
