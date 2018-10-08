import React from 'react'
import {Card, Button, Icon} from 'semantic-ui-react'
import history from '../../history'

export const EventItem = ({event}) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{event.name}</Card.Header>
        {console.log(event.description.length)}
        <Card.Meta>
          {event.description.length > 0 ? event.description : '-'}
        </Card.Meta>
        <Card.Description>Choose your restaurant preferences</Card.Description>
      </Card.Content>

      <Button
        animated
        onClick={() => history.push(`/events/${event.id}/choices/restaurants`)}
      >
        <Button.Content visible>Choose</Button.Content>
        <Button.Content hidden>
          <Icon name="options" />
        </Button.Content>
      </Button>
    </Card>
  )
}

export default EventItem
