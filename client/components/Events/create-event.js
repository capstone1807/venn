import React from 'react'
import {connect} from 'react-redux'
import history from '../../history'
import {fetchFriends, postEvent} from '../../store'
import AddFriendsModal from '../Friends/AddFriendsModal'
import {DateInput, TimeInput} from 'semantic-ui-calendar-react'
import {
  Form,
  TextArea,
  Select,
  Container,
  Divider,
  Segment,
  Button
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
    this.setState({[name]: value})
  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.props.createEvent(this.state)
    history.push('/events')
  }

  handleAddFriend = async event => {
    event.preventDefault()
    const username = this.state.selectedUser
    const id = this.props.users.find(user => user.username === username).id
    await this.props.addToFriends(id)
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
      <Container style={{width: 500}}>
        <Form verticalalign="middle" >
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
                onChange={this.handleChangeDateOrTime}
              />
              <TimeInput
                name="time"
                placeholder="Time"
                value={this.state.time}
                iconPosition="left"
                onChange={this.handleChangeDateOrTime}
              />
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
            <label>Choose guests from your friends list</label>
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
        </Form>
        <AddFriendsModal />
        <Button floated="right" color="vk" onClick={this.handleSubmit}>Next</Button>
        <Button floated="right" onClick={() => history.goBack()}>
            Cancel
        </Button>
      </Container>
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
