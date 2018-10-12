import React, {Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import moment from 'moment'
import Map from './Map'
import {
  Header,
  Grid,
  Container,
  Card,
  Icon,
  GridColumn,
  Divider,
  Button,
  Item
} from 'semantic-ui-react'
import {
  fetchEvent,
  fetchGuests,
  fetchFinalRestaurant,
  fetchFriends,
  addFriend,
  lockInEvent
} from '../../store'
import styles from '../Utils/Global.css'
import EventDate from './EventDate'
import Map from './Map'

class EventDetail extends React.Component {
  async componentDidMount() {
    await this.props.getEvent()
    await this.props.getGuests()
    await this.props.getFriends()
    this.props.currentEvent &&
      !this.props.currentEvent.isPending &&
      (await this.props.getFinalRestaurant())
  }

  handleSubmit = async event => {
    event.preventDefault()
    const id = event.target.value
    await this.props.addToFriends(id)
  }

  handleCloseEvent = async () => {
    await this.props.closeEvent(this.props.currentEvent.id)
  }

  getStatus = event => {
    if (event.isPending) return 'Pending Event'
    return event.isPast ? 'Past Event' : 'Scheduled Event'
  }

  render() {
    const {currentEvent, guests, finalRestaurant, friends} = this.props
    const userId = friends.length && friends[0].friendship.userId
    const creator =
      guests.length && guests.find(guest => guest.event_user.isAdmin)
    const prettyDate = moment(currentEvent.date, 'MM-DD-YYYY').format('LL')
    const prettyTime = currentEvent.time
    console.log('Final Restaurant: ', this.props.finalRestaurant)
    return (
      <Fragment>
        <Container style={styles.h1}>
          <Item.Group>
            <Item>
              <EventDate date={prettyDate} />
              <Item.Content>
                <Item.Meta>{this.getStatus(currentEvent)}</Item.Meta>
                <Item.Header>{currentEvent.name}</Item.Header>
                <Item.Description>
                  {`Created by ${creator.firstName} ${creator.lastName} (${
                    creator.email
                  })`}
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Container>
        <Grid>
          <Grid.Column width={16} style={styles.eventContent}>
            <Container>
              <Grid>
                <GridColumn width={8}>
                  <Header as="h2">Details</Header>
                  <p>{currentEvent.description}</p>
                  {!currentEvent.isPast ? (
                    <Header as="h2">
                      Who's going to be there? ({guests.length})
                    </Header>
                  ) : (
                    <Header as="h2">Who went? ({guests.length})</Header>
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
                        {friends.length &&
                        friends.find(f => f.username === item.username) ? (
                          <Button color="vk" disabled>
                            <Icon
                              name="heart"
                              style={{color: 'white'}}
                              size="small"
                            />
                            Already In Friends
                          </Button>
                        ) : userId === item.id ? (
                          <Button color="google plus" disabled>
                            <Icon
                              name="heart"
                              style={{color: 'white'}}
                              size="small"
                            />
                            Me
                          </Button>
                        ) : (
                          <Button
                            color="vk"
                            onClick={this.handleSubmit}
                            value={item.id}
                          >
                            <Icon
                              name="heart outline"
                              style={{color: 'white'}}
                              size="small"
                            />
                            Add to Friends
                          </Button>
                        )}
                      </Card>
                    ))}
                  </Card.Group>
                </GridColumn>
                <GridColumn width={8}>
                  <Card fluid>
                    <Grid style={styles.paddingAllButBottom}>
                      <Grid.Row>
                        <Grid.Column width={2}>
                          <Icon size="large" name="clock" color="grey" />
                        </Grid.Column>
                        <Grid.Column width={14}>
                          <h4 style={styles.mBottomNone}>{prettyDate}</h4>
                          <h4 style={styles.mTopNone}>{prettyTime}</h4>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={2}>
                          <Icon
                            size="large"
                            name="map marker alternate"
                            color="grey"
                          />
                        </Grid.Column>
                        <Grid.Column width={14}>
                          {!currentEvent.isPending && finalRestaurant.id ? (
                            <Fragment>
                              <h4 style={styles.mBottomNone}>
                                {finalRestaurant.title}
                              </h4>
                              <h4
                                style={{
                                  ...styles.mediumGreyText,
                                  ...styles.mTopNone
                                }}
                              >
                                {finalRestaurant.description}
                              </h4>
                            </Fragment>
                          ) : (
                            <h4 style={styles.mediumGreyText}>
                              Check back when everyone has responded!
                            </h4>
                          )}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    <Divider />
                    {finalRestaurant ? (
                      <Map
                        latitude={finalRestaurant.latitude}
                        longitude={finalRestaurant.longitude}
                      />
                    ) : (
                      <Map />
                    )}
                  </Card>
                  {userId === creator.id &&
                    currentEvent.isPending && (
                      <Grid.Column width={8}>
                        <Container>
                          <Button
                            type="button"
                            floated="right"
                            color="google plus"
                            onClick={this.handleCloseEvent}
                          >
                            Show me the plan!
                          </Button>
                        </Container>
                      </Grid.Column>
                    )}
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
  guests: state.guests,
  finalRestaurant: state.final.restaurant,
  friends: state.friends
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  getEvent: () => dispatch(fetchEvent(getId(ownProps))),
  getGuests: () => dispatch(fetchGuests(getId(ownProps))),
  getFinalRestaurant: () => dispatch(fetchFinalRestaurant(getId(ownProps))),
  getFriends: () => dispatch(fetchFriends()),
  addToFriends: id => dispatch(addFriend(id)),
  closeEvent: id => dispatch(lockInEvent(id))
})
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventDetail)
)
