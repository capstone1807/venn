import React from 'react'
import {connect} from 'react-redux'
import history from '../../history'
import {fetchFriends, postEvent} from '../../store'
import Calendar from './Calendar'
import {
  Form,
  TextArea,
  Select,
  Radio,
  Container,
  Divider
} from 'semantic-ui-react'

export class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventName: '',
      description: '',
      guests: [],
      isPrivate: false
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

  toggle = () => {
    this.setState(state => {
      return {isPrivate: !state.isPrivate}
    })
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
    return (
      <Form verticalalign="middle" onSubmit={this.handleSubmit}>
        <Container style={{width: 500}}>
          <Form.Field>
            <label>Name your event</label>
            <input
              placeholder="Event Name"
              onChange={this.handleChangeEventName}
            />
          </Form.Field>

          <Form.Field>
            <label>Choose a date & time</label>
            <Calendar/>
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
        <label>Select guests</label>
          <Select
            placeholder="choose friends"
            fluid
            search
            multiple
            selection
            options={friends}
            onChange={this.handleChangeGuests}
          />
          </Form.Field>
          </Container>
        <Divider horizontal hidden />
        <Form.Button type="button" onClick={() => history.goBack()}>
          Cancel
        </Form.Button>
        <Form.Button color="vk">Next</Form.Button>
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
