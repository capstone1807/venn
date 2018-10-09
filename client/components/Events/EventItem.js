import React from 'react'
import {Card, Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import history from '../../history'
import styles from '../Utils/Global.css'

export const EventItem = ({evt}) => {
  console.log('EVENT =>', evt)
  return (
    <Card as={Link} to={`/events/${evt.id}`}>
      <Card.Content>
        <Card.Header>{evt.name}</Card.Header>
        <Card.Meta>
          {evt.description && evt.description.length > 0
            ? evt.description
            : '-'}
        </Card.Meta>
        <Card.Description>Choose your restaurant preferences</Card.Description>
        {evt.event_user.hasResponded && (
          <Card.Description style={styles.greenText}>
            You did it! <Icon name="checkmark" color="green" />
          </Card.Description>
        )}
      </Card.Content>

      {!evt.event_user.hasResponded && (
        <Button
          color="vk"
          onClick={e => {
            e.preventDefault()
            history.push(`/events/${evt.id}/choices/restaurants`)
          }}
        >
          <Icon name="options" />
          Choose
        </Button>
      )}
    </Card>
  )
}

export default EventItem
