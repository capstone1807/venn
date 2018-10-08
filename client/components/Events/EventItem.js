import React from 'react'
import {Card, Button, Icon} from 'semantic-ui-react'
import history from '../../history'
import styles from '../Utils/Global.css'

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
        {event.event_user.hasResponded && (
          <Card.Description style={styles.greenText}>
            You did it! <Icon name="checkmark" color="green" />
          </Card.Description>
        )}
      </Card.Content>

      {!event.event_user.hasResponded && (
        <Button
          animated
          onClick={() =>
            history.push(`/events/${event.id}/choices/restaurants`)
          }
        >
          <Button.Content visible>Choose</Button.Content>
          <Button.Content hidden>
            <Icon name="options" />
          </Button.Content>
        </Button>
      )}
    </Card>
  )
}

export default EventItem
