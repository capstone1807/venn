import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {fetchEvents} from '../../store'
import NoData from '../Utils/NoData'
import {Container, Header, Card, Grid} from 'semantic-ui-react'
import {EventItem} from './EventItem'
import {EventFilter} from './EventFilter'
import EventAddButton from './EventAddButton'
import style from '../Utils/Global.css'

class EventList extends Component {
  state = {activeItem: 'allEvents'}

  handleFilterClick = (e, {name}) => this.setState({activeItem: name})

  async componentDidMount() {
    await this.props.getEvents()
  }

  render() {
    const {activeItem} = this.state
    const events = this.props.events.filter(event => {
      switch (this.state.activeItem) {
        case 'myEvents':
          return event.event_user.isAdmin
        default:
          return true
      }
    })

    const hasEvents = events.length > 0

    return (
      <Container>
        <Grid>
          <Grid.Column width={16}>
            <Header as="h1" content="Events" style={style.h1} />
          </Grid.Column>

          {!hasEvents && (
            <Fragment>
              <Grid.Column width={16} textAlign="center">
                <NoData
                  iconName="calendar outline"
                  message="You have no events"
                />
              </Grid.Column>
              <Grid.Column width={16} textAlign="center">
                <EventAddButton />
              </Grid.Column>
            </Fragment>
          )}

          <Grid.Column width={16}>
            <EventAddButton />
          </Grid.Column>

          {hasEvents && (
            <Grid.Column width={16}>
              <EventFilter
                activeItem={activeItem}
                handleFilterClick={this.handleFilterClick}
              />
              <Card.Group>
                {events.map((event, idx) => {
                  return <EventItem key={idx} event={event} />
                })}
              </Card.Group>
            </Grid.Column>
          )}
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events
})

const mapDispatchToProps = dispatch => ({
  getEvents: () => dispatch(fetchEvents())
})

export default connect(mapStateToProps, mapDispatchToProps)(EventList)
