import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  Header,
  Grid,
  Container,
  Card,
  Icon,
  GridColumn,
  Divider,
  Popup
} from 'semantic-ui-react'
import {
  fetchEvent,
  lockInEvent,
  fetchGuests,
  fetchFinalRestaurant
} from '../../store'
import styles from '../Utils/Global.css'

class EventDetail extends React.Component {
  async componentDidMount() {
    await this.props.getEvent()
    await this.props.getGuests()
    await this.props.getFinalRestaurant()
  }

  async checkScheduledStatus() {
    if (
      this.props.currentEvent.isPending &&
      this.props.guests.filter(guest => !guest.event_user.hasResponded)
        .length === 0
    ) {
      await this.props.scheduleEvent()
    }
  }

  getStatus = event => {
    if (event.isPending) return 'Pending Event'
    return event.isPast ? 'Past Event' : 'Scheduled Event'
  }

  render() {
    const {currentEvent, guests, finalRestaurant} = this.props
    const creator =
      guests.length && guests.find(guest => guest.event_user.isAdmin)

    guests.length && this.checkScheduledStatus()

    return (
      <Grid>
        <Grid.Column width={16}>
          <Container>
            {this.getStatus(currentEvent)}
            <Header as="h1">{currentEvent.name}</Header>
            <div>
              <span style={styles.mSmall}> Created By:</span>
              {`${creator.firstName} ${creator.lastName} (${creator.email})`}
            </div>
            <div>
              <span style={styles.mSmall}>
                {currentEvent.isPrivate ? 'Private Event' : 'Open Event'}
              </span>
              <Popup
                trigger={<Icon name="question circle" color="grey" />}
                content={
                  currentEvent.isPrivate
                    ? 'Sorry the guest list is closed!'
                    : 'You can invite friends!'
                }
                on={['hover', 'click']}
              />
            </div>
          </Container>
        </Grid.Column>
        <Grid.Column width={16} style={styles.eventContent}>
          <Container>
            <Grid>
              <GridColumn width={8}>
                <Header>Details</Header>
                <p>{currentEvent.description}</p>
                {!currentEvent.isPast ? (
                  <p>Who's going to be there? ({guests.length})</p>
                ) : (
                  <p>Who went? ({guests.length})</p>
                )}
                <Card.Group>
                  {guests.map((item, idx) => (
                    <Card key={idx} width={4}>
                      <Card.Content textAlign="center">
                        <Icon name="user circle" color="grey" size="huge" />
                        <br />
                        <br />
                        <Card.Header
                          textAlign="center"
                          content={`${item.firstName} ${item.lastName}`}
                        />
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
              </GridColumn>
              <GridColumn width={8}>
                <Card>
                  <Grid style={styles.padding}>
                    <Grid.Row>
                      <Grid.Column width={2}>
                        <Icon name="clock outline" color="grey" />
                      </Grid.Column>
                      <Grid.Column width={14}>
                        <p>Monday, February 21, 2018</p>
                        <p>Brunch</p>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={2}>
                        <Icon name="map marker alternate" color="grey" />
                      </Grid.Column>
                      <Grid.Column width={14}>
                        <p>
                          {!currentEvent.isPending && finalRestaurant.id
                            ? finalRestaurant.title
                            : 'Check back when everyone has responded!'}
                        </p>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Divider />
                  <div>Map with pin</div>
                </Card>
              </GridColumn>
            </Grid>
          </Container>
        </Grid.Column>
      </Grid>
    )
  }
}

const getId = props => Number(props.match.params.id)

const mapStateToProps = state => ({
  currentEvent: state.currentEvent,
  guests: state.users,
  finalRestaurant: state.final.restaurant
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  getEvent: () => dispatch(fetchEvent(getId(ownProps))),
  getGuests: () => dispatch(fetchGuests(getId(ownProps))),
  scheduleEvent: () => dispatch(lockInEvent(getId(ownProps))),
  getFinalRestaurant: () => dispatch(fetchFinalRestaurant(getId(ownProps)))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventDetail)
)
