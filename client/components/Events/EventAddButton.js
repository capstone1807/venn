import React from 'react'
import history from '../../history'
import {Button, Icon} from 'semantic-ui-react'

const EventAddButton = props => {
  return (
    <Button
      color="google plus"
      animated
      onClick={() => history.push('/events/new')}
    >
      <Button.Content visible>Add Event</Button.Content>
      <Button.Content hidden>
        <Icon name="plus" />
      </Button.Content>
    </Button>
  )
}

export default EventAddButton
