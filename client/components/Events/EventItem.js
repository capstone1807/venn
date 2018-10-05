import React from 'react'
import {Card, Button} from 'semantic-ui-react'
import history from '../../history'

const getCardColor = status => {
  switch (status) {
    case 'pending':
      return 'red'
    case 'upcoming':
      return 'green'
    case 'past':
    default:
      return 'grey'
  }
}

export const EventItem = ({event}) => {
  return (
    <Card color={getCardColor(event.status)}>
      <Card.Content>
        <Card.Header>{event.name}</Card.Header>
        <Card.Meta>{event.description}</Card.Meta>
        <Card.Description>Choose your restaurant preferences</Card.Description>
        <div className="ui two buttons">
          <Button
            basic
            color="green"
            onClick={() =>
              history.push(`/events/${event.id}/choices/restaurants`)
            }
          >
            CHOOSE
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
}

export default EventItem
