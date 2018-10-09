import React, {Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  Header,
  Grid,
  Container,
  Card,
  Icon,
  GridColumn
} from 'semantic-ui-react'
import {fetchEvent, lockInEvent, fetchGuests, fetchFinalRestaurant} from '../../store'
import styles from '../Utils/Global.css'

class EventDetail extends React.Component {
  async componentDidMount() {
    await this.props.getEvent()
    await this.props.getGuests()
    await this.props.getFinalRestaurant()
  }

  async checkScheduledStatus(){
    if(this.props.currentEvent.isPending && this.props.guests.filter(guest => !guest.event_user.hasResponded).length === 0){
      await this.props.scheduleEvent()
    }
  }

  render() {
    const {currentEvent, guests, finalRestaurant} = this.props
    const creator = guests.length && guests.filter(guest => guest.event_user.isAdmin)[0]
    guests.length && this.checkScheduledStatus()
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={16}>
            <Container>
              <Header>Date: June 12 in rounded box</Header>
              {currentEvent.isPast ? 'Past Event' : 'Upcoming Event'}
              <div as="h3">Event Name: {currentEvent.name}</div>
              <div>Created By: {`${creator.firstName} ${creator.lastName} (${creator.email})`}</div>
              <div>
                {currentEvent.isPrivate ? 'Private Event' : 'Open Event'}
                <Icon name="question circle" color="grey" />
              </div>
            </Container>
          </Grid.Column>
          <Grid.Column width={16} style={styles.eventContent}>
            <Container>
              <Grid>
                <GridColumn width={8}>
                  <Header>Details</Header>
                  <p>(description) {currentEvent.description}</p>
                  {!currentEvent.isPast
                    ? <p>Who's going to be there? ({guests.length})</p>
                    : <p>Who went? ({guests.length})</p>}
                  <Card.Group>
                    {guests.map(
                      (item, idx) => (
                        <Card key={idx} width={4}>
                          <Card.Content textAlign="center">
                            <Icon name="user circle" color="grey" size="huge" />
                            <br />
                            <br />
                            <Card.Header
                              textAlign="center"
                              content={`${item.firstName} ${item.lastName}`}
                            />
                            <Card.Description
                              textAlign="center"
                              content={item.username}
                            />
                          </Card.Content>
                        </Card>
                      )
                    )}
                  </Card.Group>
                </GridColumn>
                <GridColumn width={8}>
                  <Card fluid>
                    <Card.Content>
                      <Card.Content style={styles.mBottom}>
                        <Grid>
                          <Grid.Row>
                            <Grid.Column width={2}>
                              <Icon name="clock" color="grey" />
                            </Grid.Column>
                            <Grid.Column width={14}>
                              <p>Monday, February 21, 2018</p>
                              <p>
                                Brunch
                                <Icon name="calendar alternate outline" />
                              </p>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Card.Content>
                      <Card.Content style={styles.mBottom}>
                        <Grid>
                          <Grid.Row>
                            <Grid.Column width={2}>
                              <Icon name="pin" color="grey" />
                            </Grid.Column>
                            <Grid.Column width={14}>
                              <p>{(!currentEvent.isPending && finalRestaurant.id) ? finalRestaurant.title : 'Check back when everyone has responded!'}</p>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Card.Content>
                    </Card.Content>

                    <Card.Content>Map with pin</Card.Content>
                  </Card>
                </GridColumn>
              </Grid>
            </Container>
          </Grid.Column>
        </Grid>
      </Fragment>
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
