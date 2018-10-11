import React, {Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import formatDate from '../../../UtilFuncs/formatDate'
import formatTime from '../../../UtilFuncs/formatTime'
import Map from './Map'
import {
  Header,
  Grid,
  Container,
  Card,
  Icon,
  GridColumn,
  Divider
} from 'semantic-ui-react'
import {fetchEvent, fetchGuests, fetchFinalRestaurant} from '../../store'
import styles from '../Utils/Global.css'
import EventDate from './EventDate'

class EventDetail extends React.Component {
  async componentDidMount() {
    await this.props.getEvent()
    await this.props.getGuests()
    this.props.currentEvent &&
      !this.props.currentEvent.isPending &&
      (await this.props.getFinalRestaurant())
  }

  getStatus = event => {
    if (event.isPending) return 'Pending Event'
    return event.isPast ? 'Past Event' : 'Scheduled Event'
  }

  render() {
    const {currentEvent, guests, finalRestaurant} = this.props
    const creator =
      guests.length && guests.find(guest => guest.event_user.isAdmin)
    const prettyDate = currentEvent.date && formatDate(currentEvent.date)
    const prettyTime = currentEvent.time && formatTime(currentEvent.time)
    console.log('lat&long =>', finalRestaurant)
    return (
      <Grid>
        <Grid.Column width={16}>
          <Container>
            <EventDate date={currentEvent.date} />
            <div>
              <span style={styles.mediumGreyText}>
                {this.getStatus(currentEvent)}
              </span>

              <Header
                as="h1"
                style={{...styles.mTopNone, ...styles.mBottomNone}}
              >
                {currentEvent.name}
              </Header>
              <div>
                <span style={{...styles.mRightSmall, ...styles.mediumGreyText}}>
                  Created By
                </span>
                {`${creator.firstName} ${creator.lastName} (${creator.email})`}
              </div>
            </div>
          </Container>
        </Grid.Column>
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
                  {finalRestaurant ? <Map latitude={finalRestaurant.latitude} longitude={finalRestaurant.longitude}/> :
                  <Map />}
                </Card>
              </GridColumn>
            </Grid>
          </Container>
        </Grid.Column>finalRestaurant
      </Grid>
    )
  }
}

const getId = props => Number(props.match.params.id)

const mapStateToProps = state => ({
  currentEvent: state.currentEvent,
  guests: state.guests,
  finalRestaurant: state.final.restaurant
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  getEvent: () => dispatch(fetchEvent(getId(ownProps))),
  getGuests: () => dispatch(fetchGuests(getId(ownProps))),
  getFinalRestaurant: () => dispatch(fetchFinalRestaurant(getId(ownProps)))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventDetail)
)
