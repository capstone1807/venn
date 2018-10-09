import React from 'react'
import {connect} from 'react-redux'
import history from '../../history'
import {fetchFriends, postEvent} from '../../store'
import {
  DateInput,
  TimeInput,
} from 'semantic-ui-calendar-react';
import {
  Form,
  TextArea,
  Select,
  Container,
  Divider,
  Segment
} from 'semantic-ui-react'

export class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventName: '',
      description: '',
      guests: [],
      date: '',
      time: ''
    }
  }
  async componentDidMount() {
    await this.props.getFriends()
  }

  handleChangeEventName = event => {
    event.persist()
    this.setState({
      eventName: event.target.value
    })
  }

  handleChangeDescription = event => {
    event.persist()
    this.setState({
      description: event.target.value
    })
  }

  handleChangeGuests = (event, data) => {
    event.persist()
    this.setState({
      guests: data.value
    })
  }

  handleChangeDateOrTime = (event, {name, value}) => {
    event.persist()
    this.setState({ [name]: value });

  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.props.createEvent(this.state)
    history.push('/events')
  }

  render() {
    const friends =
      this.props.friends &&
      this.props.friends.map(function(friend) {
        return {
          key: friend.username,
          value: friend.username,
          text: friend.firstName + ' ' + friend.lastName
        }
      })
      console.log('STATE =>', this.state)
    return (
      <Form verticalalign="middle" onSubmit={this.handleSubmit}>
        <Container style={{width: 500}}>
          <Form.Field>
            <label>Name your event</label>
            <input
              placeholder="Event name"
              onChange={this.handleChangeEventName}
            />
          </Form.Field>

          <Form.Field>
            <label>Choose a date & time</label>
            <Segment>
        <DateInput
          name="date"
          placeholder="Date"
          value={this.state.date}
          iconPosition="left"
          onChange={this.handleChangeDateOrTime} />
        <TimeInput
          name="time"
          placeholder="Time"
          value={this.state.time}
          iconPosition="left"
          onChange={this.handleChangeDateOrTime} />
      </Segment>
          </Form.Field>

          <Form.Field>
            <label>Description</label>
            <TextArea
              autoHeight
              placeholder="Anything else you want your guests to know?"
              onChange={this.handleChangeDescription}
            />
          </Form.Field>
          <Form.Field>
        <label>Choose friends to invite</label>
          <Select
            placeholder="Choose friends"
            fluid
            search
            multiple
            selection
            options={friends}
            onChange={this.handleChangeGuests}
          />
          </Form.Field>
        <Divider horizontal hidden />
        <Form.Button type="button" onClick={() => history.goBack()}>
          Cancel
        </Form.Button>
        <Form.Button color="vk">Next</Form.Button>
        </Container>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  friends: state.friends
})

const mapDispatchToProps = dispatch => ({
  getFriends: () => dispatch(fetchFriends()),
  createEvent: newEvent => dispatch(postEvent(newEvent))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)
