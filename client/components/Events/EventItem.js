import React from 'react'
import {Card, Button, Icon, Divider} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import history from '../../history'
import styles from '../Utils/Global.css'
import formatDate from '../../../UtilFuncs/formatDate'

export const EventItem = ({evt}) => {
  const prettyDate = evt.date && formatDate(evt.date)
  const needsResponse = !evt.event_user.hasResponded
  const responded = evt.event_user.hasResponded && evt.isPending
  const pending = evt.isPending
  const scheduled = evt.event_user.hasResponded && !evt.isPending && !evt.isPast
  const past = evt.isPast

  return (
    <Card as={Link} to={`/events/${evt.id}`}>
      <Card.Content>
        <Card.Header>{evt.name}</Card.Header>
        <Card.Meta>{prettyDate}</Card.Meta>
        {pending && <Card.Meta style={styles.greenText}>Choose your restaurant preferences</Card.Meta>}
        {responded && (
          <Card.Description style={styles.greenText}>
            You did it! <Icon name="checkmark" color="green" />
          </Card.Description>
        )}
      </Card.Content>
      {needsResponse && (
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
