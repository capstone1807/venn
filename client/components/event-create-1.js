import React from 'react'
import {connect} from 'react-redux'
import {fetchFriends, postEvent} from '../store'
import {Form, TextArea, Dropdown, Segment, Radio} from 'semantic-ui-react'

export class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventName: '',
      description: '',
      guests: [],
      isPrivate: false
    }
    this.handleChangeEventName = this.handleChangeEventName.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
    this.handleChangeGuests = this.handleChangeGuests.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.getFriends()
  }

  handleChangeEventName(event) {
    event.persist()
    this.setState({
      eventName: event.target.value
    })
  }

  handleChangeDescription(event) {
    event.persist()
    this.setState({
      description: event.target.value
    })
  }

  handleChangeGuests(event, data) {
    event.persist()
    this.setState({
      guests: data.value
    })
  }

  toggle() {
    this.setState(state => {
      return {isPrivate: !state.isPrivate}
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    this.props.createEvent(this.state)
    console.log('I clicked!')
  }

  render() {
    console.log('STATE', this.state)
    console.log('GUESTS =>', this.state.guests)

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
      <Segment>
        {/* // event name */}
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Name Your Event</label>
            <input
              placeholder="Event Name"
              onChange={this.handleChangeEventName}
            />
          </Form.Field>
          {/* event description field */}
          <Form.Field>
            <label>Description</label>
            <TextArea
              placeholder="Anything else you want your guests to know?"
              onChange={this.handleChangeDescription}
            />
          </Form.Field>
          {/* // select friends to invite */}
          <Segment vertical style={{width: 500}}>
            <Dropdown
              placeholder="choose friends"
              fluid
              multiple
              selection
              options={friends}
              onChange={this.handleChangeGuests}
            />
          </Segment>
          {/* // isPrivate?\*/}
          <Radio toggle onChange={this.toggle} />
          {/* cancel + next buttons */}
          <Form.Button>Cancel</Form.Button>
          <Form.Button>Next</Form.Button>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  friends: state.friends.friends
})

const mapDispatchToProps = dispatch => ({
  getFriends: () => dispatch(fetchFriends()),
  createEvent: newEvent => dispatch(postEvent(newEvent))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)
