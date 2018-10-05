import React from 'react'
import {Card} from 'semantic-ui-react'

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
        <Card.Description>Choose you restaurant preferences</Card.Description>
      </Card.Content>
    </Card>
  )
}

export default EventItem
