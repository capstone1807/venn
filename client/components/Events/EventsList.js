import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import history from '../../history'
import {fetchEvents} from '../../store'
import NoData from '../Utils/NoData'
import {Container, Header, Card, Button, Icon} from 'semantic-ui-react'
import {EventItem} from './EventItem'
import {EventFilter} from './EventFilter'

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
      <Fragment>
        <Header>Events</Header>
        {!hasEvents && (
          <NoData iconName="calendar outline" message="You have no events" />
        )}
        <Button primary animated onClick={() => history.push('/events/new')}>
          <Button.Content visible>Add Event</Button.Content>
          <Button.Content hidden>
            <Icon name="plus" />
          </Button.Content>
        </Button>
        {hasEvents && (
          <Container>
            <EventFilter
              activeItem={activeItem}
              handleFilterClick={this.handleFilterClick}
            />

            <Card.Group>
              {events.map((event, idx) => {
                return <EventItem key={idx} event={event} />
              })}
            </Card.Group>
          </Container>
        )}
      </Fragment>
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
