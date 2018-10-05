import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import history from '../../history'
import {fetchEvents} from '../../store'
import NoData from '../Utils/NoData'
import {Container, Header, Card, Button, Icon} from 'semantic-ui-react'

class EventList extends Component {
  async componentDidMount() {
    await this.props.getEvents()
  }

  render() {
    const events = this.props.events.map(item => ({
      header: item.name,
      meta: item.description
    }))

    return (
      <Fragment>
        <Header>Events</Header>
        <Button primary animated onClick={() => history.push('/newevent')}>
          <Button.Content visible>Add Event</Button.Content>
          <Button.Content hidden>
            <Icon name="plus" />
          </Button.Content>
        </Button>
        {!events.length && (
          <NoData iconName="calendar outline" message="You have no events" />
        )}
        {events && (
          <Container>
            <Card.Group items={events} />
            {/* add onClick for each card/item to view detail */}
          </Container>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({events: state.events})

const mapDispatchToProps = dispatch => ({
  getEvents: () => dispatch(fetchEvents())
})

export default connect(mapStateToProps, mapDispatchToProps)(EventList)
